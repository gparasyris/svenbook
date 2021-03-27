import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionPipe } from '../function.pipe';



@NgModule({
  declarations: [FunctionPipe],
  imports: [
    CommonModule
  ],
  exports:[FunctionPipe]
})
export class SharedModule { }
