import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'num2array'
})
export class Num2arrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
