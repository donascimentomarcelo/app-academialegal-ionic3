import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicioDTO } from '../../models/exercicio.dto';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];
  letra: Array<{ letra:string }> = [];
  repeticao:Array<{ repeticao:string }> = [];
  observacao:Array<{ observacao:string }> = [];
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
    
    for(var i=0; i<cart.items.length; i++)
    {
      this.observacao[i] = cart.items[i].observacao as any; 
      this.repeticao[i] = cart.items[i].repeticoes as any; 
      this.letra[i] = cart.items[i].letra as any; 
    };
  };

  removeItem(exercicio: ExercicioDTO)
  {
    this.items = this.cartService.removeExercicio(exercicio).items;
  };

  addLetra(exercicio: ExercicioDTO, index: number)
  {
    let letra: any = this.letra[index];
    
    this.items = this.cartService.addLetra(exercicio, letra).items;
  };
  
  addRepeticoes(exercicio: ExercicioDTO, index: number)
  {
    let repeticao: any = this.repeticao[index];
    
    this.items = this.cartService.addRepeticoes(exercicio, repeticao).items;
  };

  addObservacoes(exercicio: ExercicioDTO, index: number)
  {
    let obs:any = this.observacao[index];
    
    this.items = this.cartService.addObservacoes(exercicio, obs).items;
  };

  deleteStorageCart()
  {
    this.storage.setCart(null);
    this.ionViewDidLoad();
  };

  redirectToGroupPage()
  {
    this.navCtrl.setRoot('GrupoPage');
  };

  viewer()
  {
    this.navCtrl.push('ConcluirSeriePage');
  };

}
