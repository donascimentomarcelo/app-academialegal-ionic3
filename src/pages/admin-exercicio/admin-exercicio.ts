import { CheckRoleService } from './../../services/check-role.service';
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
      public loadingCtrl: LoadingController,
      public check: CheckRoleService) 
      {
        this.check.checkPerfilAdminProf();
      };

  exercicios: ExercicioDTO[] = [];
  search: string;
  page : number = 0;

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

    this.exercicioService.findAll(this.page, 20)
    .subscribe(response => {
      loader.dismiss();
      this.exercicios = this.exercicios.concat(response['content']);         
    }, error => {
      loader.dismiss();
      if(error.status == 403)
      {
        this.check.accessAllowed();
      };
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

  onInput(nome){
    this.exercicioService.findByName(nome)
      .subscribe(response => {
        this.exercicios = response;
        if(nome.length == 0)
        {
          this.onClear();
        }
      }, error => {
        if(error.status == 403)
        {
          this.check.accessAllowed();
        };
      });
  };


  onClear()
  {   
    this.search = "";
    this.exercicios = [];
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
    this.search = "";
    this.page = 0;
    this.exercicios = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

  doInfinite(infiniteScroll) 
  {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  };

}
