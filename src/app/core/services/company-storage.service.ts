import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LOCAL_STORAGE_TOKEN } from './storage.service'
import { Company } from '@app/companies/models';

export * from './storage.service'

@Injectable({ providedIn: 'root' })
export class CompanyStorageService {
  private collectionKey = 'companies-app';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError('Local Storage Not Supported');
  }

  getCollection(): Observable<Company[]> {
    return this.supported().pipe(
      map(_ => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToCollection(records: Company[]): Observable<Company[]> {
    return this.getCollection().pipe(
      map((value: Company[]) => [...value, ...records]),
      tap((value: Company[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  removeFromCollection(ids: Array<string>): Observable<Company[]> {
    return this.getCollection().pipe(
      map((value: Company[]) => value.filter(item => !ids.includes(item.id))),
      tap((value: Company[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  deleteCollection(): Observable<boolean> {
    return this.supported().pipe(
      tap(() => this.storage.removeItem(this.collectionKey))
    );
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
