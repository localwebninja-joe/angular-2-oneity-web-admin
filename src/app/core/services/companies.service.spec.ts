import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { cold } from 'jasmine-marbles';

import { CompaniesService } from '@app/core/services/companies.service';

describe('Service: Companies', () => {
  let service: CompaniesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: { get: jest.fn() } }],
    });

    service = TestBed.get(CompaniesService);
    http = TestBed.get(HttpClient);
  });

  const data = {
    title: 'Book Title',
    author: 'John Smith',
    volumeId: '12345',
  };

  const companies = {
    items: [
      { id: '12345', volumeInfo: { title: 'Title' } },
      { id: '67890', volumeInfo: { title: 'Another Title' } },
    ],
  };

  const queryTitle = 'Book Title';

  it('should call the search api and return the search results', () => {
    const response = cold('- a|', { a: companies });
    const expected = cold('-b|', { b: companies.items });
    http.get = jest.fn(() => response);

    expect(service.searchCompanies(queryTitle)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/companies/v1/volumes?orderBy=newest&q=${queryTitle}`
    );
  });

  it('should retrieve the companies from the volumeId', () => {
    const response = cold('-a|', { a: data });
    const expected = cold('-b|', { b: data });
    http.get = jest.fn(() => response);

    expect(service.retrieveCompany(data.volumeId)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/companies/v1/volumes/${data.volumeId}`
    );
  });
});
