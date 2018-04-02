import { SerieDTO } from './../../models/serie.dto';
import { SerieService } from './../../services/domain/serie.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-serie-details',
  templateUrl: 'serie-details.html',
})
export class SerieDetailsPage {

  codigo: number = this.navParams.get('id');
  serie: SerieDTO[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService) {
  }

  ionViewDidLoad() {
    this.serieService.findOne(this.codigo)
      .subscribe(response => {
        console.log(response);
        var agrupado = [];
        response.itens.forEach(function (i) {
          var foiAgrupado = false;
          agrupado.forEach(function (j) {
              if (j.Key == i['letra']) {
                  j.Elements.push(i);
                  foiAgrupado = true;
              }
          });
          if (!foiAgrupado) agrupado.push({ Key: i['letra'], Elements: [ i ] });
         });
      
        this.serie = agrupado;
        console.log(this.serie);
        
        
      }, error => {});
  }

}
