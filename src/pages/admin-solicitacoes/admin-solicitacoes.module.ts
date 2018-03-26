import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSolicitacoesPage } from './admin-solicitacoes';

@NgModule({
  declarations: [
    AdminSolicitacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSolicitacoesPage),
  ],
})
export class AdminSolicitacoesPageModule {}
