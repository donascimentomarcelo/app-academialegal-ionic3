import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

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
    public sideMenu: MenuController,
    public authService: AuthService,
    public myApp: MyApp) {

  }

  login()
  {
    this.authService.authenticate(this.creds)
        .subscribe(response => {
          this.authService.successfulLogin(response.headers.get('Authorization'));

          this.navCtrl.setRoot('GrupoPage')
        }, error => {

        });
  }

  ionViewWillEnter()
  {
    this.sideMenu.swipeEnable(false);
  }

  ionViewDidLeave()
  {
    this.sideMenu.swipeEnable(true);
    this.myApp.loadSideMenu();
  }
}
