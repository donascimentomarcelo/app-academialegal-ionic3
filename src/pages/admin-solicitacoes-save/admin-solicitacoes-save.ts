import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public solicitacaoService: SolicitacaoService) {

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
    this.solicitacaoService.create(this.formGroup.value)
      .subscribe(response => {
        this.navCtrl.pop();
      }, error => {});
    
  }

}
