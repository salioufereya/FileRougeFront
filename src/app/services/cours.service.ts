import { Injectable } from '@angular/core';
import { RootService } from './root.service';
import { Dta, Root } from '../models/Root';

@Injectable({
  providedIn: 'root'
})
export class CoursService extends RootService {


  getAllNeed() {
    return this.all<Root<Dta>>('cours/getAllNeed')
  }

}
