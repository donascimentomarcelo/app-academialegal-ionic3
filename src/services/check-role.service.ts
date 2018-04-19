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

    checkPerfilAdminProf()
    {
      let ls = this.storage.getLocalPerfis();
      
      if(!ls)
      {
        this.accessAllowed();
      };  
      
      if(ls)
      {
        if(!ls.perfis.includes("ADMIN") && !ls.perfis.includes("PROFESSOR"))
        { 
          this.accessAllowed();
        };
      };
    };

    checkPerfilAluno()
    {
      let ls = this.storage.getLocalPerfis();
      
      if(!ls)
      {
        this.accessAllowed();
      };

      if(ls)
      {
        if(!ls.perfis.includes("ALUNO"))
        {
          this.accessAllowed();
        };
      };
    };

    checkPerfilAdmin()
    {
      let ls = this.storage.getLocalPerfis();
      
      if(!ls)
      {
        this.accessAllowed();
      };

      if(ls)
      {
        if(!ls.perfis.includes("ADMIN"))
        {
          this.accessAllowed();
        };
      };
    };

    checkPerfilProfessor()
    {
      let ls = this.storage.getLocalPerfis();
      
      if(!ls)
      {
        this.accessAllowed();
      };

      if(ls)
      {
        if(!ls.perfis.includes("PROFESSOR"))
        {
          this.accessAllowed();
        };
      };
    };

    handler403(error)
    {
      if(error.status == 403)
      {
        this.accessAllowed();
      };
    }
}