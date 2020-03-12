import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Company } from '@app/companies/models';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private API_PATH = 'https://www.googleapis.com/companies/v1/volumes';

  constructor(private http: HttpClient) {}

  searchCompanies(queryTitle: string): Observable<Company[]> {
    return this.http
      .get<{ items: Company[] }>(`${this.API_PATH}?orderBy=newest&q=${queryTitle}`)
      .pipe(map(companies => companies.items || []));
  }

  retrieveCompany(volumeId: string): Observable<Company> {
    return this.http.get<Company>(`${this.API_PATH}/${volumeId}`);
  }
}
