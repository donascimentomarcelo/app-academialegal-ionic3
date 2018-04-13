import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlunoPage } from './dashboard-aluno';

@NgModule({
  declarations: [
    DashboardAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlunoPage),
  ],
})
export class DashboardAlunoPageModule {}
