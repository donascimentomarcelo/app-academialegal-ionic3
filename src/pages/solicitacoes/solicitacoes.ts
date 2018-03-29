import { SolicitacaoDTO } from './../../models/solicitacao.dto';
import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer } from 'ionic-angular';

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

  ionViewDidEnter()
  {
    this.loadData();
  };

  closeFab(event, fab: FabContainer)
  {
    fab.close();
  };

  loadData()
  {
    this.solicitacaoService.findByUserLogged()
    .subscribe(response => {
     this.solicitacoes = response;
    }, error => {});
  };

  details(id: string)
  {
    this.navCtrl.push('SolicitacaoDetailsPage', {id: id});
  };

  @ViewChild(Content) content: Content;

  scrollToTop() 
  {
    this.content.scrollToTop();
  };

  scrollToBottom() 
  {
    this.content.scrollToBottom();
  };

  showSerieFormNew()
  {
    this.navCtrl.push('AdminSolicitacoesSavePage');
  }

}
