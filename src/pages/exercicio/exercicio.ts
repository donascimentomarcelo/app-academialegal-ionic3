import { ExercicioDTO } from './../../models/exercicio.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public exercicioService: ExercicioService) {
  }
  
  ionViewDidLoad() 
  {
    this.exercicioService.findByCategory(this.codigo)
      .subscribe(response => {
        this.exercicios = response;
      }, error => {
        this.navCtrl.pop();
      });
  };

}
