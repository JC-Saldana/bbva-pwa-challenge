import { gameMovements, gameRequiredBoxes, gameSeconds } from '../../../constants';
import { getPointsPerWin } from './getPointsPerWin';

describe('getPointsPerWin function', () => {
  it('returns correct points for gameSeconds[3], gameRequiredBoxes[6], and gameMovements.true', () => {
    const points = getPointsPerWin(gameSeconds[3], gameRequiredBoxes[6], gameMovements.true);
    expect(points).toBe(70); 
  });

  it('returns correct points for gameSeconds[6], gameRequiredBoxes[9], and gameMovements.false', () => {
    const points = getPointsPerWin(gameSeconds[6], gameRequiredBoxes[9], gameMovements.false);
    expect(points).toBe(40);
  });

  it('returns correct points for gameSeconds[9], gameRequiredBoxes[12], and undefined movement', () => {
    const points = getPointsPerWin(gameSeconds[9], gameRequiredBoxes[12]);
    expect(points).toBe(40);
  });

  it('returns correct points for custom values', () => {
    const points = getPointsPerWin(5000, 10, true);
    expect(points).toBe(50);
  });
});
