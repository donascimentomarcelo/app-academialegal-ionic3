import { SolicitacaoDTO } from './../../models/solicitacao.dto';
import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, LoadingController } from 'ionic-angular';

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
      public solicitacaoService: SolicitacaoService,
      public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad()
  {
    let loader = this.presentLoading();
    this.solicitacaoService.findByUserLogged()
    .subscribe(response => {
      loader.dismiss();
     this.solicitacoes = response;
    }, error => {
      loader.dismiss();
    });
  };

  closeFab(event, fab: FabContainer)
  {
    fab.close();
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
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.ionViewDidLoad();
    }, 2000);
  };

}
