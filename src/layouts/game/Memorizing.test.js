import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Memorizing from './Memorizing';

describe('Memorizing component', () => {
  it('renders the title correctly', () => {
    render(<Memorizing randomNumbers={[1, 2, 3, 4, 5, 6]} />);
    const titleElement = screen.getByText(/Memorize the cards/i);
    expect(titleElement).toBeInTheDocument();
  });
});
