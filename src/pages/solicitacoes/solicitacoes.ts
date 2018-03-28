import { SolicitacaoDTO } from './../../models/solicitacao.dto';
import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-solicitacoes',
  templateUrl: 'solicitacoes.html',
})
export class SolicitacoesPage {

  solicitacoes: SolicitacaoDTO[];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public solicitacaoService: SolicitacaoService) {
  }

  ionViewDidLoad() {
    this.solicitacaoService.findByUserLogged()
      .subscribe(response => {
       this.solicitacoes = response;
      }, error => {});
  };

  details(id: string)
  {
    this.navCtrl.push('SolicitacaoDetailsPage', {id: id});
  };

}
