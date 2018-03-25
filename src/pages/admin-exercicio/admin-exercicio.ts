import { ExercicioDTO } from './../../models/exercicio.dto';
import { ExercicioService } from './../../services/domain/exercicio.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content  } from 'ionic-angular';

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
  total: number;
  search: string;

  ionViewDidEnter()
  {
    this.loadExercicios();
  }

  loadExercicios()
  {
    this.exercicioService.findAll()
    .subscribe(response => {
      this.exercicios = response['content'];
      this.total = response['content'].length;      
    }, error => { });
  };

  edit(id: string)
  {
    this.exercicioService.findOne(id)
      .subscribe(response => {
        console.log(response);
      }, error => {});
  };

  showExercicioForm(id: string)
  {
    this.navCtrl.push('AdminExercicioSavePage', {id: id})
  };

  showExercicioFormNew()
  {
    this.navCtrl.push('AdminExercicioSavePage');
  };

  onInput(name){
    this.exercicioService.findByName(name)
      .subscribe(response => {
        this.exercicios = response;
        this.total = this.exercicios.length;
      }, error => {});
  };


  onClear()
  {   
    this.search = "";
    this.loadExercicios();
  }

  @ViewChild(Content) content: Content;

  scrollToTop() 
  {
    this.content.scrollToTop();
  }

  scrollToBottom() 
  {
    this.content.scrollToBottom();
  }

}
