import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public sideMenu: MenuController) {

  }

  login()
  {
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
