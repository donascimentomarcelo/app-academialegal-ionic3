import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetailsPage } from './serie-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SerieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SerieDetailsPage),
    PipesModule,
  ],
})
export class SerieDetailsPageModule {}
