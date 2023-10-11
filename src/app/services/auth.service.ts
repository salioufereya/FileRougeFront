import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { RootService } from '../root.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RootService {


  search<T>(event: any): Observable<T> {

    return this.http.post<T>(this.url + '/utilisateurs/login', event)

  }

  isAuthenticated() {
    return localStorage.getItem('tkn');
  }

  loggout<T>(event: any): Observable<T> {

    return this.http.post<T>(this.url + '/utilisateurs/logout', event)
  }

}
