import { SerieDTO } from './../../models/serie.dto';
import { SerieService } from './../../services/domain/serie.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-series',
  templateUrl: 'admin-series.html',
})
export class AdminSeriesPage {

  series: SerieDTO[];
  search: string;
  count: number;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService) {
  }

  ionViewDidLoad() {
    this.serieService.find()
      .subscribe(response => {
        this.series = response['content'];
      }, error => {});
  };

  onInput(aluno)
  {
    this.serieService.findByAluno(aluno)
      .subscribe(response => {
        this.series = response;
        this.count = response.length;
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

}
