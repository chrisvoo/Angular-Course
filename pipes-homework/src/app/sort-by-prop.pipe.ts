import { Pipe, PipeTransform } from '@angular/core';
import {sortArg,Server} from "../types";


@Pipe({
  name: 'sortByProp'
})
export class SortByPropPipe implements PipeTransform {

  /**
   * Returns a comparator for objects of type T that can be used by sort
   * functions, were T objects are compared by the specified T properties.
   *
   * @param sortBy - the names of the properties to sort by, in precedence order.
   *                 Prefix any name with `-` to sort it in descending order.
   */
  byPropertiesOf<T extends object> (sortBy: Array<sortArg<T>>) {
    function compareByProperty (arg: sortArg<T>) {
      let key: keyof T
      let sortOrder = 1
      if (typeof arg === 'string' && arg.startsWith('-')) {
        sortOrder = -1
        key = arg.substring(1) as keyof T
      } else {
        key = arg as keyof T
      }
      return function (a: T, b: T) {
        const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

        return result * sortOrder
      }
    }

    return function (obj1: T, obj2: T) {
      let i = 0
      let result = 0
      const numberOfProperties = sortBy?.length
      while (result === 0 && i < numberOfProperties) {
        result = compareByProperty(sortBy[i])(obj1, obj2)
        i++
      }

      return result
    }
  }

  sort<T extends object> (arr: T[], ...sortBy: Array<sortArg<T>>) {
    arr.sort(this.byPropertiesOf<T>(sortBy))
  }

  // Type 'unknown' is not assignable to type 'NgIterable<any> | null | undefined'
  transform(values: Server[], property: string):  Server[] {
    if (values && values.constructor === Array) {
      // @ts-ignore
      this.sort(values, property)
    }

    return values;
  }

}
