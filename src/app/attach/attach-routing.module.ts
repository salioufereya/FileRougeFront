import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachComponent } from './attach.component';

const routes: Routes = [{ path: '', component: AttachComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachRoutingModule { }
