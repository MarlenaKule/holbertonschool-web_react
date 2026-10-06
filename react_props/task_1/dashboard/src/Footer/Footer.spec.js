import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders correct copyright string when getFooterCopy argument is true', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'))).toBeInTheDocument();
  });
});