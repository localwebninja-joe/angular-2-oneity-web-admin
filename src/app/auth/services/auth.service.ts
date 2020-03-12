import { Injectable, Injector } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, User, Register } from '@app/auth/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@app/../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private allCookies: {};
  private httpOptions = {
    "headers": new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization':'XSRF-TOKEN',
    'cookies': ''+ this.allCookies +''
    })
  };
  constructor(private http: HttpClient, private cookieService: CookieService, private injector: Injector ) {
    this.allCookies= this.cookieService.getAll();
    console.log('erick: ',this.allCookies);
  }

  /**
   * Login
   * @param username
   * @param password
   */
  login({ username, password }: Credentials): Observable<User> {
    return this.http.post<any>(`${environment.API_PATH}/login`,{email: username, password})
    .pipe(map(user => {
      console.log(user);
      return user;
    }));
    
        /**
     * Simulate a failed login to display the error
     * message for the login form.
     */

    // if (username == 'ido.adler@gmail.com' && password == 'J37ido9BDj9adlerg7NasWgaqourAr') {
    //   return of({ name: 'ido adler', photo: 'assets/img/a0.jpg' });
    // }
    // return throwError('Invalid username or password');
  }

  /**
   * Register User
   * @param register 
   */
  register(register: Register): Observable<Register> {
    const httpOptions = {
      "headers": new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':'XSRF-TOKEN',
      }),
      params: new HttpParams().set('ref','binomical')
    };
    return this.http.post<any>(`${environment.API_PATH}/register`,register, httpOptions)
    .pipe(map(user => {
      console.log(user);
      return user;
    }));
  }

  /**
   * Login Provider
   * @param provider 
   */
  loginProvider(provider: string): Observable<User> {
    return this.http.get<any>(`${environment.API_PATH}/login/${provider}/redirect`)
    .pipe(map(user => {
      console.log(user);
      return user;
    }));
  }

  /**
    * Join 
    * @param ref
    * ref= binomical
    * In order to register the user, it should have invitation link from other user. After this will redirected to /register page.
    */
  join(ref: string) {
    const option =  { params: new HttpParams().set('ref',ref || 'binomical') };
    return this.http.get<any>(`${environment.BASE_PATH}/join`, option)
    .pipe(map(data => {
      return data;
    }),
    
    );
  }

  /**
   * Ready Details
   * This will return the referral, provider, verified, code, social_details value
   */
  readyDetails() {
    return this.http.get<any>(`${environment.API_PATH}/ready-details`)
    .pipe(map(data => data));
  }

  /**
   * Verify Type
   * @param type
   * @param code
   */
  verifyType(type: string, code: string){
    const codeValid = code ? `/?code=${code}`: '';
    return this.http.get<any>(`${environment.API_PATH}/verify/${type}${codeValid}`)
    .pipe(map(result => result ));
  }

  /**
   * Send Verification
   * @param type 
   * @param value 
   * @param fullname 
   */
  sendVerification(type: string, value: string, fullname?: string ){
    let data = []
    if(fullname && type == 'email') {
      data.push({ email: value, fullname });
    } else {
      data.push({ mobile: value });
    }
    return this.http.post<any>(`${environment.API_PATH}/send-${type}-verification`,data)
    .pipe(map(result => result));
  }

  /**
   * Resend Verification
   * @param type = email or mobile
   * @param value
   * @param fullname 
   */
  resendVerification(type: string, value: string, fullname: string ){
    let data = []
    if(fullname && type == 'email') {
      data.push({ email: value, fullname });
    } else {
      data.push({ mobile: value });
    }
    return this.http.post<any>(`${environment.API_PATH}/resend-${type}-verification`,data)
    .pipe(map(result => result));
  }

    /**
   * Delete Verification
   * @param type 
   * @param value 
   */
  deleteVerification( type: string, value: string ) {
    return this.http.get<any>(`${environment.API_PATH}/delete-verification/${type}/${value}`)
    .pipe(map(data => data ));
  }

  /**
   * Handle Error 403 or 401
   * @param error 
   */
  handleError(error: any){
    if(error.code === 403 || error.code === 401 ){
      window.location.href = '/#/error';
      return Observable.throw(error.json());
    }
  }

  /**
   * Logout
   */
  logout() {
    return of(true);
  }
}
