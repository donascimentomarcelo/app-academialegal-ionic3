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

  solicitacoes: SolicitacaoDTO[] = [];
  search: string;
  total: number;
  showMenuRedirectToGroupPage: boolean = false;
  filter: number = 4;
  page : number = 0;

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
    this.solicitacaoService.findAll(this.page, 10)
      .subscribe(response => {
        loader.dismiss();
        this.solicitacoes = this.solicitacoes.concat(response['content']);
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
        this.solicitacoes = response;
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
        this.solicitacoes = response;
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
        this.solicitacoes = response;
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

  doInfinite(infiniteScroll) 
  {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  };

 doRefresh(refresher)
  {
    this.page = 0;
    this.solicitacoes = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

}
