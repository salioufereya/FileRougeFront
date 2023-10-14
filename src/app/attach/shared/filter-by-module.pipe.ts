import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByModule'
})
export class FilterByModulePipe implements PipeTransform {

  transform(items: any[], selected: any): any[] {
    if (!items || !selected || selected == "Filtrer par module") {
      return items;
    }
    return items.filter(item => item.cours === selected);
  }

}
