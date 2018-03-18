import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


creds: CredenciaisDTO = {
    email: "",
    senha: "" 
};

  constructor(
    public navCtrl: NavController,
    public sideMenu: MenuController) {

  }

  login()
  {
    console.log(this.creds);
    
    this.navCtrl.setRoot('GrupoPage')
  }

  ionViewWillEnter()
  {
    this.sideMenu.swipeEnable(false);
  }

  ionViewDidLeave()
  {
    this.sideMenu.swipeEnable(true);
  }
}
