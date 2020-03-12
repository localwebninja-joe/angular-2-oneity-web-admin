import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';

import { Company } from '@app/companies/models';
import {
  CompanyStorageService,
  LOCAL_STORAGE_TOKEN,
} from '@app/core/services/company-storage.service';

describe('CompanyStorageService', () => {
  let fixture: any;

  let localStorageFake: Storage & any = {
    removeItem: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn(_ => JSON.stringify(persistedCollection)),
  };

  const company1 = { id: '111', companyInfo: {} } as Company;
  const company2 = { id: '222', companyInfo: {} } as Company;
  const company3 = { id: '333', companyInfo: {} } as Company;
  const company4 = { id: '444', companyInfo: {} } as Company;

  const persistedStorageKey = 'companies-app';
  const persistedCollection = [company2, company4];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: localStorageFake,
        },
      ],
    });
    fixture = TestBed.get(CompanyStorageService);
  });

  describe('supported', () => {
    it('should have truthy value if localStorage provider set', () => {
      const expected = cold('(-a|)', { a: true });
      expect(fixture.supported()).toBeObservable(expected);
    });

    it('should throw error if localStorage provider  not available', () => {
      TestBed.resetTestingModule().configureTestingModule({
        providers: [
          {
            provide: LOCAL_STORAGE_TOKEN,
            useValue: null,
          },
        ],
      });

      fixture = TestBed.get(CompanyStorageService);
      const expected = cold('#', {}, 'Local Storage Not Supported');
      expect(fixture.supported()).toBeObservable(expected);
    });
  });

  describe('getCollection', () => {
    it('should call get collection', () => {
      const expected = cold('(-a|)', { a: persistedCollection });
      expect(fixture.getCollection()).toBeObservable(expected);
      expect(localStorageFake.getItem).toHaveBeenCalledWith(
        persistedStorageKey
      );
      localStorageFake.getItem.mockClear();
    });
  });

  describe('addToCollection', () => {
    it('should add single item', () => {
      const result = [...persistedCollection, company1];
      const expected = cold('(-a|)', { a: result });
      expect(fixture.addToCollection([company1])).toBeObservable(expected);
      expect(localStorageFake.setItem).toHaveBeenCalledWith(
        persistedStorageKey,
        JSON.stringify(result)
      );

      localStorageFake.setItem.mockClear();
    });

    it('should add multiple items', () => {
      const result = [...persistedCollection, company1, company3];
      const expected = cold('(-a|)', { a: result });
      expect(fixture.addToCollection([company1, company3])).toBeObservable(expected);
      expect(localStorageFake.setItem).toHaveBeenCalledWith(
        persistedStorageKey,
        JSON.stringify(result)
      );
      localStorageFake.setItem.mockClear();
    });
  });

  describe('removeFromCollection', () => {
    it('should remove item from collection', () => {
      const filterCollection = persistedCollection.filter(
        f => f.id !== company2.id
      );
      const expected = cold('(-a|)', { a: filterCollection });
      expect(fixture.removeFromCollection([company2.id])).toBeObservable(expected);
      expect(localStorageFake.getItem).toHaveBeenCalledWith(
        persistedStorageKey
      );
      expect(localStorageFake.setItem).toHaveBeenCalledWith(
        persistedStorageKey,
        JSON.stringify(filterCollection)
      );
      localStorageFake.getItem.mockClear();
    });

    it('should remove multiple items from collection', () => {
      const filterCollection = persistedCollection.filter(
        f => f.id !== company4.id
      );
      const expected = cold('(-a|)', { a: filterCollection });
      expect(fixture.removeFromCollection([company4.id])).toBeObservable(expected);
      expect(localStorageFake.getItem).toHaveBeenCalledWith(
        persistedStorageKey
      );
      expect(localStorageFake.setItem).toHaveBeenCalledWith(
        persistedStorageKey,
        JSON.stringify(filterCollection)
      );
      localStorageFake.getItem.mockClear();
    });

    it('should ignore items not present in collection', () => {
      const filterCollection = persistedCollection;
      const expected = cold('(-a|)', { a: filterCollection });
      expect(fixture.removeFromCollection([company1.id])).toBeObservable(expected);
    });
  });

  describe('deleteCollection', () => {
    it('should delete storage key and collection', () => {
      const expected = cold('(-a|)', { a: true });
      expect(fixture.deleteCollection()).toBeObservable(expected);
      expect(localStorageFake.removeItem).toHaveBeenCalledWith(
        persistedStorageKey
      );
      localStorageFake.removeItem.mockClear();
    });
  });
});
