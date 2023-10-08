import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { PlanifierCoursRpComponent } from './planifier-cours-rp/planifier-cours-rp.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltreCoursPipe } from './shared/filtre-cours.pipe';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localfr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PlanifierSessionRpComponent } from './planifier-session-rp/planifier-session-rp.component';
registerLocaleData(localfr, 'fr');

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
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    PlanifierCoursRpComponent,
    PlanifierSessionRpComponent,
    FiltreCoursPipe,
    CalendrierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
