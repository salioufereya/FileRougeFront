import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrerByState'
})
export class FiltrerByStatePipe implements PipeTransform {

  transform(sessions: any[], state: string): any[] {
    if (!state) {
      return sessions;
    }

    return sessions.filter(session => session.etat == state);
  }
}
