import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacaoDetailsPage } from './solicitacao-details';

@NgModule({
  declarations: [
    SolicitacaoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacaoDetailsPage),
  ],
})
export class SolicitacaoDetailsPageModule {}
