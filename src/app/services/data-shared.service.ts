import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  private dataUpdated = new Subject<any>();
  dataUpdated$ = this.dataUpdated.asObservable();
  updateData(data: any) {
    this.dataUpdated.next(data);
  }
}
