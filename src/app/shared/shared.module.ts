import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionPipe } from '../function.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';


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
