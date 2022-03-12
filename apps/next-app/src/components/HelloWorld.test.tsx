import { render, screen } from '@testing-library/react';
import React from 'react';
import HelloWorld from './HelloWorld';

describe('tests', () => {
  it('should', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Boop')).toBeInTheDocument();
  });
});
