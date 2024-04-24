import { generateRandomNumbers } from './generateRandomNumbers'; // Import the function to be tested

/**
 * Test suite for the generateRandomNumbers function.
 */
describe('generateRandomNumbers', () => {
  /**
   * Test case to check if the function returns an array of the specified length.
   */
  test('returns an array of the specified length', () => {
    const result = generateRandomNumbers(5);
    expect(result).toHaveLength(5);
  });

  /**
   * Test case to check if the function returns an array with unique numbers.
   */
  test('returns an array with unique numbers', () => {
    const result = generateRandomNumbers(100);
    const uniqueSet = new Set(result);
    expect(uniqueSet.size).toBe(100);
  });

  /**
   * Test case to check if the function returns an array containing numbers from 1 to the specified length.
   */
  test('returns an array containing numbers from 1 to the specified length', () => {
    const length = 10;
    const result = generateRandomNumbers(length);
    const isInRange = result.every(value => value >= 1 && value <= length);
    expect(isInRange).toBe(true);
  });
});
