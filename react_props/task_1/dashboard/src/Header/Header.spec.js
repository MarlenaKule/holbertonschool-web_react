import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Header from './Header';

describe('Header component', () => {
  test('contains the Holberton logo', () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('contains an h1 with the correct text', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i })
    ).toBeInTheDocument();
  });
});