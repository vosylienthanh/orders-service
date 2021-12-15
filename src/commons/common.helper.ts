import { isNil, pickBy } from 'lodash';

export class CommonHelper {
  static clearNilProperties<T extends Object>(data: T): Partial<T> {
    return pickBy(data, (value) => !isNil(value));
  }
}
