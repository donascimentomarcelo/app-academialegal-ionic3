import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { SerieService } from '../../services/domain/serie.service';
import { SerieDTO } from '../../models/serie.dto';

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  series: SerieDTO[];
  search: string;
  count: number;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService) {
  }

  ionViewDidLoad() {
    this.serieService.findMySerie()
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
