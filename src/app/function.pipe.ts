import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fn' })
export class FunctionPipe implements PipeTransform {
  transform(value: any, callback: (...args: any[]) => any, context: any = null, ...args: any[]): any {
    let ret: any;
    try {
      ret = callback.apply(context, [value, ...args]);
    } catch (err) {
      ret = null;
    }
    return ret;
  }
}
