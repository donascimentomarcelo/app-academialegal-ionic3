import { NgModule } from '@angular/core';
import { OrderByPipe } from './sort/sort';
@NgModule({
	declarations: [OrderByPipe],
	imports: [],
	exports: [OrderByPipe]
})
export class PipesModule {}
