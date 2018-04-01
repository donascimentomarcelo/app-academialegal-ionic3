import { SerieDTO } from './../../models/serie.dto';
import { SerieService } from './../../services/domain/serie.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-series',
  templateUrl: 'admin-series.html',
})
export class AdminSeriesPage {

  series: SerieDTO[];
  
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
  }

}
