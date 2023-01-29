import { UtilityFunction } from '@sapphire/plugin-utilities-store';

export class SumUtility extends UtilityFunction {
  public constructor(context: UtilityFunction.Context, options: UtilityFunction.Options) {
    super(context, {
      ...options,
      name: 'sum'
    });
  }

  public handle(numberOne: number, numberTwo: number) {
    return numberOne + numberTwo;
  }
}


