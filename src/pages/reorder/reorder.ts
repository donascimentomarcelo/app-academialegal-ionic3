import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/domain/cart.service';
import { CartItem } from '../../models/cart-item';
import { Cart } from '../../models/cart';

@IonicPage()
@Component({
  selector: 'page-reorder',
  templateUrl: 'reorder.html',
})
export class ReorderPage {

  items: CartItem[];
  count: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let cart =  this.cartService.getCart();
    this.items = cart.items
    this.count = this.items.length;
    console.log(this.items);
    
  };

  reorderItems(indexes) 
  {  
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    let cart: Cart = {items: this.items};
    this.storage.setCart(cart);
  };

  viewer()
  {    
    for(var i=0; i<this.items.length; i++)
    {
      this.items[i].order = i;
    };
 
    let cart: Cart = {items: this.items};
    
    this.storage.setCart(cart);

    this.navCtrl.push('ConcluirSeriePage');
  };

}
