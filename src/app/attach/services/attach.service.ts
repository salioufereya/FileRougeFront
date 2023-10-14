import { Injectable } from '@angular/core';
import { Dta, Root } from 'src/app/models/Root';
import { RootService } from 'src/app/services/root.service';

@Injectable({
  providedIn: 'root'
})
export class AttachService extends RootService {

  getAllNeed() {
    return this.all<Root<Dta>>('cours/getAllNeed')

  }

}
