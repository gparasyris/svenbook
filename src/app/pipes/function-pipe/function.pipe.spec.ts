import { FunctionPipe } from './function.pipe';

describe('FunctionPipe', () => {
  it('create an instance', () => {
    const pipe = new FunctionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should add correctly', () => {
    const add = (a, b) => a + b;
    const pipe = new FunctionPipe();
    const result = pipe.transform(1, add, null, 2);
    expect(result).toEqual(3);
  });

  it('should return null in error', () => {
    const pipe = new FunctionPipe();
    const result = pipe.transform(1, {} as any, null, 2);
    expect(result).toBeNull();
  });
});
