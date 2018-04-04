import { SolicitacaoDTO } from './../../models/solicitacao.dto';
import { SerieDTO } from './../../models/serie.dto';
import { SerieService } from './../../services/domain/serie.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, transition, animate, style, state, keyframes } from '@angular/animations'

@IonicPage()
@Component({
  selector: 'page-serie-details',
  templateUrl: 'serie-details.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ],
})
export class SerieDetailsPage {

  codigo: number = this.navParams.get('id');
  items: SerieDTO[];
  serie: SerieDTO;
  solicitacao: SolicitacaoDTO;
  accordionDescricao = 'accordion';
  accordionObs = 'accordionObs';
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];
  showDetails: boolean = false;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public serieService: SerieService) {
  }

  ionViewDidLoad() {
    this.serieService.findOne(this.codigo)
      .subscribe(response => {
        var agrupado = [];
        
        response.itens.forEach(function (i) {
          var foiAgrupado = false;
          agrupado.forEach(function (j) {
              if (j.Key == i['letra']) {
                  j.Elements.push(i);
                  foiAgrupado = true;
              }
          });
          if (!foiAgrupado) agrupado.push({ Key: i['letra'], Elements: [ i ], icon: 'md-add-circle' });
         });
         
        this.serie = response;
        this.solicitacao = response.solicitacao;
        this.items = agrupado;        
      }, error => {});
  };

  shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = !this.shownGroup;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'md-add-circle';
    } else {
        data.showDetails = true;
        data.icon = 'md-remove-circle';
    }
  };

}
