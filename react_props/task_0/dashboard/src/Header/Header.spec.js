import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('contains the Holberton logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/holberton/i);
    expect(logo).toBeInTheDocument();
  });

  it('contains the h1 element with correct text', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/school dashboard/i);
  });
});