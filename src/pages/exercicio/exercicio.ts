import { CartService } from './../../services/domain/cart.service';
import { ExercicioDTO } from './../../models/exercicio.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ExercicioService } from '../../services/domain/exercicio.service';

@IonicPage()
@Component({
  selector: 'page-exercicio',
  templateUrl: 'exercicio.html',
})
export class ExercicioPage {

  codigo: string = this.navParams.get('id');
  exercicios: ExercicioDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public exercicioService: ExercicioService,
    public cartService: CartService,
    public loadingCtrl: LoadingController) {
  }
  
  ionViewDidLoad() 
  {
    let loader = this.presentLoading();
    this.exercicioService.findByCategory(this.codigo)
      .subscribe(response => {
        loader.dismiss();
        this.exercicios = response;
      }, error => {
        if(error.status == 400)
        {
          loader.dismiss();
          this.navCtrl.setRoot('GrupoPage');
        }

      });
  };

  addToCart(exercicio: ExercicioDTO)
  {
    this.cartService.addExercicio(exercicio);
    this.navCtrl.setRoot('CartPage');
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

}
