import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';

@IonicPage()
@Component({
  selector: 'page-admin-solicitacoes',
  templateUrl: 'admin-solicitacoes.html',
})
export class AdminSolicitacoesPage {

  solicitacoes: SolicitacaoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public solicitacaoService: SolicitacaoService) {
  }

  ionViewDidLoad() {
    this.solicitacaoService.findAll()
      .subscribe(response => {
        this.solicitacoes = response['content'];
      }, error => {});
  }

}
