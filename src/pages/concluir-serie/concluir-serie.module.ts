import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcluirSeriePage } from './concluir-serie';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ConcluirSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(ConcluirSeriePage),
    PipesModule,
  ],
})
export class ConcluirSeriePageModule {}
