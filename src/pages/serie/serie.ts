import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, FabContainer } from 'ionic-angular';
import { SerieService } from '../../services/domain/serie.service';
import { SerieDTO } from '../../models/serie.dto';

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  series: SerieDTO[] = [];
  search: string;
  page : number = 0;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService,
      public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.serieService.findMySerie(this.page, 1)
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
      }, error => {});
  }

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
    this.series = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

  redirectToSolicitacao()
  {
    this.navCtrl.setRoot('SolicitacoesPage');
  }

}
