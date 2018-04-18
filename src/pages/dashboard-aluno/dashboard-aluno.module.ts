import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlunoPage } from './dashboard-aluno';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    DashboardAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlunoPage),
    ChartsModule
  ],
})
export class DashboardAlunoPageModule {}
