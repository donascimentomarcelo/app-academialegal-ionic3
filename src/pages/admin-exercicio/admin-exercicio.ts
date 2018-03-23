import { ExercicioDTO } from './../../models/exercicio.dto';
import { ExercicioService } from './../../services/domain/exercicio.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-exercicio',
  templateUrl: 'admin-exercicio.html',
})
export class AdminExercicioPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public exercicioService: ExercicioService) {
  };

  exercicios: ExercicioDTO[];

  ionViewDidLoad() 
  {
    this.exercicioService.findAll()
      .subscribe(response => {
        this.exercicios = response['content'];
      }, error => { });
  }

}
