import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAdminPage } from './dashboard-admin';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    DashboardAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAdminPage),
    ChartsModule
  ],
})
export class DashboardAdminPageModule {}
