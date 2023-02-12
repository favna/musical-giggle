import { UtilityFunction } from '@sapphire/plugin-utilities-store';

export class SumUtility extends UtilityFunction {
  public constructor(context: UtilityFunction.Context, options: UtilityFunction.Options) {
    super(context, {
      ...options,
      name: 'sum'
    });
  }

  public add(numberOne: number, numberTwo: number) {
    this.container.logger.warn('testing sum');
    return numberOne + numberTwo;
  }

  public subtract(numberOne: number, numberTwo: number) {
    this.container.logger.warn('testing sum');
    return numberOne + numberTwo;
  }
}
