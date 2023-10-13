import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/Root';
import { RootService } from 'src/app/services/root.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService extends RootService {

  search<T>(params: any,next:string): Observable<T> {
    return this.http.post<T>(this.url + `/${next}`, params)
  }
}
