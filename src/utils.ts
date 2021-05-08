
export function getIntersection(arr1: [], arr2: string [], ele1 = 'id') {
  return arr1.filter(item => arr2.some(item2 => item[ele1] == item2))
}