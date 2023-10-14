import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreCours'
})
export class FiltreCoursPipe implements PipeTransform {
  transform(items: any[], selected: any): any[] {
    if (!items || !selected || selected == "filtrer par module") {
      return items;
    }
    return items.filter(item => (item.module || item.cours) === selected);
  }
}
