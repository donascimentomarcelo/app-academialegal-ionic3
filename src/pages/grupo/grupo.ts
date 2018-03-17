import { GrupoService } from './../services/domain/grupo.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public grupoSercive: GrupoService) {
  }

  ionViewDidLoad() {
    this.grupoSercive.findAll()
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }

}
