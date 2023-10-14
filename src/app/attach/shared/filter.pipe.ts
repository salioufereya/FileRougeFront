import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], selectedValue: any): any[] {
    if (!items || !selectedValue || selectedValue=="Filtrer par prof") {
      return items;
    }
    return items.filter(item => item.professeur === selectedValue);
  }

}
