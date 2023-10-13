import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ProfesseursRoutingModule } from './professeurs-routing.module';
import { ProfesseursComponent } from './professeurs.component';
import { CalendrierProfComponent } from './calendrier-prof/calendrier-prof.component';
import { CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

//registerLocaleData(localfr, 'fr');

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date)
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date)
  }
}
@NgModule({
  declarations: [
    ProfesseursComponent,
    CalendrierProfComponent
  ],
  imports: [
    CommonModule,
    ProfesseursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ]
})
export class ProfesseursModule { }
