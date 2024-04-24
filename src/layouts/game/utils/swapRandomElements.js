/**
 * Swaps two random elements in an array.
 * @param {Array<any>} array - The input array.
 * @returns {Array<any>} The array with two elements swapped.
 */
export const swapRandomElements = array => {
  if (array.length < 2) return array.slice();

  // Generate random indices
  var index1 = Math.floor(Math.random() * array.length);
  var index2 = Math.floor(Math.random() * array.length);

  // Ensure index2 is different from index1
  while (index2 === index1) {
      index2 = Math.floor(Math.random() * array.length);
  }

  // Create a copy of the original array to avoid modifying it directly
  var newArray = array.slice();

  // Swap the elements in the new array
  var temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;

  return newArray;
};
