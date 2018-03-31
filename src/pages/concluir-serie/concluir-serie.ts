import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CartItem } from '../../models/cart-item';

@IonicPage()
@Component({
  selector: 'page-concluir-serie',
  templateUrl: 'concluir-serie.html',
})
export class ConcluirSeriePage {

  items: CartItem[];
  
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

  }


