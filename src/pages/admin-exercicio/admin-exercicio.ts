import { ExercicioDTO } from './../../models/exercicio.dto';
import { ExercicioService } from './../../services/domain/exercicio.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, LoadingController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-exercicio',
  templateUrl: 'admin-exercicio.html',
})
export class AdminExercicioPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public exercicioService: ExercicioService,
      public loadingCtrl: LoadingController) {
  };

  exercicios: ExercicioDTO[];
  total: number;
  search: string;

  ionViewDidLoad()
  {
    this.loadExercicios();
  };

  closeFab(event, fab: FabContainer)
  {
    fab.close();
  };

  loadExercicios()
  {
    let loader = this.presentLoading();

    this.exercicioService.findAll()
    .subscribe(response => {
      loader.dismiss();
      this.exercicios = response['content'];
      this.total = response['content'].length;      
    }, error => {
      loader.dismiss();
     });
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

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.loadExercicios();
    }, 2000);
  };

}
