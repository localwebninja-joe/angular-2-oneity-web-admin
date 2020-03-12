
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Settings, userRegistrationFields, Countries, Languages, Roles, Calls, countries } from '@app/core/models/index';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from '@app/../environments/environment';
@Injectable({
    providedIn: 'root',
  })
export class AppSettingsService {

    httpOptions = {
        "headers": new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':'XSRF-TOKEN',
        })
    };
   constructor(private http: HttpClient) {}
    /**
     * Get Settings
     */
    getSettings(): Observable<Settings> {
        return this.http
        .get<Settings>("../../../assets/data/settings.json")
        .pipe(map(settings => settings));
    }
    /**
     * Get User Registration Fields
     */
    getUserRegistrationFields(): Observable<userRegistrationFields> {
        return this.http 
        .get<Calls>(`${environment.API_PATH}/user-registration-fields`)
        .pipe(map(({ data }) => {
            return <userRegistrationFields>(data)
        }),
            catchError((error) => { 
                return throwError(error);
            })
        );
    }
    /**
     * Get All Countries
     */
    getAllCountries(): Observable<Countries> {
        return this.http
        .get<Calls>(`${environment.API_PATH}/get-all-countries`)
        .pipe(
            map(({ data }) => <Countries>(data)),
            catchError((error) => { 
                return throwError(error);
            })
        );
    }
    /**
     * Get All Languages
     */
    getAllLanguages(): Observable<Languages> {
        return this.http
        .get<Calls>(`${environment.API_PATH}/get-all-languages`)
        .pipe(
            map(({ data }) => <Languages>(data)),
            catchError((error) => { 
                return throwError(error);
            })
        );
    }
    /**
     * Get All Roles
     */
    getAllRoles(): Observable<Roles> {
        return this.http
        .get<Calls>(`${environment.API_PATH}/get-all-roles`)
        .pipe(
            map(({ data }) => <Roles>(data)),
            catchError((error) => { 
                return throwError(error);
            })
        );
    }
}