import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreCours'
})
export class FiltreCoursPipe implements PipeTransform {
  transform(items: any[], filtreCours: string): any[] {
    if (!items || !filtreCours) {
      return items;
    }
    return items.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
          if (item[key].includes(filtreCours)) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
