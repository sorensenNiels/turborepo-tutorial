import { render, screen } from '@testing-library/react';
import React from 'react';
import MenuItems from './MenuItems';

xdescribe('tests', () => {
  it('should', () => {
    render(<MenuItems />);
    expect(screen.getByText('Boop')).toBeInTheDocument();
  });
});
