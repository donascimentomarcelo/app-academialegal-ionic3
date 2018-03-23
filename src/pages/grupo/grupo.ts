import { API_CONFIG } from './../../config/api.config';
import { GrupoDTO } from './../../models/grupo.dto';
import { GrupoService } from './../../services/domain/grupo.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

grupos: GrupoDTO[];
bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public grupoSercive: GrupoService) {
  }

  ionViewDidLoad() {
    this.grupoSercive.findAll()
      .subscribe(response => {
        this.grupos = response;
      }, error => {
        
      })
  };

  showExercicios(id: string)
  {
    this.navCtrl.push('ExercicioPage', {id: id});
  };

}
