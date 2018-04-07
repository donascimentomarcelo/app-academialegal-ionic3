import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitacaoService } from '../../services/domain/solicitacao.service';

@IonicPage()
@Component({
  selector: 'page-admin-solicitacoes-save',
  templateUrl: 'admin-solicitacoes-save.html',
})
export class AdminSolicitacoesSavePage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public solicitacaoService: SolicitacaoService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public events: Events) {

    this.formGroup = this.formBuilder.group({
      tipoSerie:['',[Validators.required]],
      descricao:['',[Validators.minLength(5), Validators.maxLength(80)]],
    },{validator: this.matchingDescricao('tipoSerie', 'descricao')});
  };

  matchingDescricao(tipoSerieKey: string, descricaoKey: string)
  {
    return (group: FormGroup): {[key: string]: any} => {
      let tipoSerie = group.controls['tipoSerie'].value;
      let descricao = group.controls['descricao'].value;
      
      if (tipoSerie == 3 && descricao == '') {
        return {
          mismatchedDescricao: true
        };
      }
    }
  }

  save()
  {
    let loader = this.presentLoading();
    this.solicitacaoService.create(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.success();
        this.events.publish('created');
      }, error => {
        loader.dismiss();
      });
  };

  success()
  {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'A solicitação foi criada com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

}
