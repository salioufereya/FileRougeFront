import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachRoutingModule } from './attach-routing.module';
import { AttachComponent } from './attach.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByModulePipe } from './shared/filter-by-module.pipe';


@NgModule({
  declarations: [
    AttachComponent,
    FilterPipe,
    FilterByModulePipe
  ],
  imports: [
    CommonModule,
    AttachRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AttachModule { }
