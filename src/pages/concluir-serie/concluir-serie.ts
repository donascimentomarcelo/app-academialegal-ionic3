import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CartItem } from '../../models/cart-item';
import { SerieDTO } from '../../models/serie.dto';

@IonicPage()
@Component({
  selector: 'page-concluir-serie',
  templateUrl: 'concluir-serie.html',
})
export class ConcluirSeriePage {

  items: CartItem[];
  serie: SerieDTO;
  observacao: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public cartService: CartService) {

  }

  ionViewDidLoad() 
  {
    let cart =  this.cartService.getCart();
    
    var agrupado = [];
    cart.items.forEach(function (i) {
      var foiAgrupado = false;
      agrupado.forEach(function (j) {
          if (j.Key == i['letra']) {
              j.Elements.push(i);
              foiAgrupado = true;
          }
      });
      if (!foiAgrupado) agrupado.push({ Key: i['letra'], Elements: [ i ] });
     });
  
    this.items = agrupado;
  };

  save()
  {
    let solicitacaoId: any = this.storage.getSolicitacao();
    
    let cart = this.cartService.getCart();

    this.serie = {
      solicitacao: {id: solicitacaoId.id},
      observacao: this.observacao,
      itens: cart.items.map(key => {return {
        letra: key.letra, 
        repeticoes: key.repeticoes, 
        observacao: key.observacao, 
          exercicio: {
            id: key.exercicio.id
          }
        }
      })
    };
    console.log(this.serie);
    
  };

  }


