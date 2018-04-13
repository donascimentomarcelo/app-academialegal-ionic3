import { Injectable } from "@angular/core";
import { AlertController, App } from "ionic-angular";
import { StorageService } from "./storage.service";

@Injectable()
export class CheckRoleService {
    
    constructor(
        public alertCtrl: AlertController,
        public storage: StorageService,
        public app: App
    ) 
    {

    }

    accessAllowed()
    {
        let alert = this.alertCtrl.create({
          title: 'Acesso negado!',
          message: 'você não tem permissão para acessar essa página!',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.app.getActiveNav().setRoot('HomePage'); 
              }
            }
          ]
      });
      alert.present();
    };
}