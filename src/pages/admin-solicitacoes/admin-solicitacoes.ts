import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, LoadingController } from 'ionic-angular';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-admin-solicitacoes',
  templateUrl: 'admin-solicitacoes.html',
})
export class AdminSolicitacoesPage {

  solicitacoes: SolicitacaoDTO[];
  search: string;
  total: number;
  showMenuRedirectToGroupPage: boolean = false;
  filter: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public solicitacaoService: SolicitacaoService,
    public storage: StorageService,
    public loadingCtrl: LoadingController) {
    
    let solId = this.storage.getSolicitacao();

    if(solId)
    {
      this.showMenuRedirectToGroupPage = true;
    }

  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.solicitacaoService.findAll()
      .subscribe(response => {
        loader.dismiss();
        this.solicitacoes = response['content'];
        this.total = response['content'].length;
      }, error => {
        loader.dismiss();
      });
  };

  closeFab(event, fab: FabContainer)
  {
    fab.close();
  };

  onInput(solicitante)
  {
    this.solicitacaoService.findBySolicitante(solicitante)
      .subscribe(response => {
        this.solicitacoes = response;
        this.total = response.length
      }, error => {});
  };

  onClear()
  {   
    this.search = "";
    this.ionViewDidLoad();
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

  details(id: string)
  {
    this.navCtrl.push('SolicitacaoDetailsPage', {id: id});
  };

  redirectToCartPage()
  {
    this.navCtrl.setRoot('CartPage');
  };

  filterBy()
  {
    switch(this.filter)
    {
      case 1:
      this.pendentes();
      break;

      case 2:
      this.concluido();
      break;

      case 3:
      this.rejeitado();
      break;

      case 4:
      this.ionViewDidLoad();
      break;
    };
  };

  pendentes()
  {
    let loader = this.presentLoading();
    this.solicitacaoService.pendente()
      .subscribe(response => {
        loader.dismiss();
        this.solicitacoes = response['content'];
        this.total = response['content'].length;
      }, error => {
        loader.dismiss();
      });
  };

  concluido()
  {
    let loader = this.presentLoading();
    this.solicitacaoService.concluido()
      .subscribe(response => {
        loader.dismiss();
        this.solicitacoes = response['content'];
        this.total = response['content'].length;
      }, error => {
        loader.dismiss();
      });
  };

  rejeitado()
  {
    let loader = this.presentLoading();
    this.solicitacaoService.rejeitado()
      .subscribe(response => {
        loader.dismiss();
        this.solicitacoes = response['content'];
        this.total = response['content'].length;
      }, error => {
        loader.dismiss();
      });
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
