import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Playing from './Playing';

/**
 * Test suite for the Playing component.
 */
describe('Playing component', () => {
  /**
   * Test case to check if the title renders correctly.
   */
  it('renders the title correctly', () => {
    const solutionNumber = 7; // Example solution number
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    render(<Playing solutionNumber={solutionNumber} randomNumbers={randomNumbers} />);
    const titleElement = screen.getByText(`Find number ${solutionNumber}`);
    expect(titleElement).toBeInTheDocument();
  });
});
