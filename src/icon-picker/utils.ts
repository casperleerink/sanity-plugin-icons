import {ConfigurationIconObjectArray} from '../types'

export function listToMatrix(
  list: ConfigurationIconObjectArray,
  elementsPerSubArray: number,
): Array<ConfigurationIconObjectArray> {
  const matrix: Array<ConfigurationIconObjectArray> = []

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++
      matrix[k] = []
    }
    matrix[k].push(list[i])
  }

  return matrix
}
