import { pickRandomElement } from './pickRandomElement';

describe('pickRandomElement function', () => {
  it('returns a random element from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const selectedElement = pickRandomElement(array);
    expect(array).toContain(selectedElement);
  });

  it('returns undefined for an empty array', () => {
    const array = [];
    const selectedElement = pickRandomElement(array);
    expect(selectedElement).toBeUndefined();
  });

  it('returns the only element for an array with one element', () => {
    const array = [42];
    const selectedElement = pickRandomElement(array);
    expect(selectedElement).toBe(42);
  });
});
