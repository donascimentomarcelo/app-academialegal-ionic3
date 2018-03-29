import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      tipoSerie:['',[Validators.required]],
      descricao:['',[Validators.minLength(5), Validators.maxLength(80)]],
    });
  };

  save()
  {
    console.log(this.formGroup.value);
    
  }

}
