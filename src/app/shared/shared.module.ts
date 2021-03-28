import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { FunctionPipe } from '@pipes/function-pipe/function.pipe';


@NgModule({
  declarations: [FunctionPipe],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule
  ],
  exports:[FunctionPipe]
})
export class SharedModule { }
