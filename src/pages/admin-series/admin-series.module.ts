import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSeriesPage } from './admin-series';

@NgModule({
  declarations: [
    AdminSeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSeriesPage),
  ],
})
export class AdminSeriesPageModule {}
