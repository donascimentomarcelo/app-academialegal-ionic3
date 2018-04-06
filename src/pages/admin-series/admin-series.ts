import { StorageService } from './../../services/storage.service';
import { SerieDTO } from './../../models/serie.dto';
import { SerieService } from './../../services/domain/serie.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Content, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-series',
  templateUrl: 'admin-series.html',
})
export class AdminSeriesPage {

  series: SerieDTO[] = [];
  search: string;
  count: number;
  page : number = 0;
  showMenuRedirectToCartPage: boolean = false;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService,
      public loadingCtrl: LoadingController,
      public storage: StorageService) {

        let solId = this.storage.getSolicitacao();

        if(solId)
        {
          this.showMenuRedirectToCartPage = true;
        }
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.serieService.find(this.page, 20)
      .subscribe(response => {
        loader.dismiss();
        this.series = this.series.concat(response['content']);
      }, error => {
        loader.dismiss();
      });
  };

  onInput(aluno)
  {
    this.serieService.findByAluno(aluno)
      .subscribe(response => {
        this.series = response;
        if(aluno.length == 0)
        {
          this.onClear();
        }
      }, error => {});
  }

  onClear()
  {   
    this.search = "";
    this.series = [];
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
    this.navCtrl.push('SerieDetailsPage', {id: id});
  };

  closeFab(event, fab: FabContainer)
  {
    fab.close();
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  doRefresh(refresher) 
  {
    this.search = "";
    this.page = 0;
    this.series = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

  doInfinite(infiniteScroll) 
  {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  };

  redirectToCartPage()
  {
    this.navCtrl.setRoot('CartPage');
  };
}
