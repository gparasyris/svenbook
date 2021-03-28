import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionPipe } from '../function.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressbarDirective } from '../progressbar.directive';
import { ProgressbarComponent } from './progressbar/progressbar.component';


@NgModule({
  declarations: [FunctionPipe, ProgressbarComponent, ProgressbarDirective],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule
    // BrowserAnimationsModule,
    // MatGridListModule
  ],
  exports:[FunctionPipe, ProgressbarComponent, ProgressbarDirective]
})
export class SharedModule { }
