import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  it('renders a button and a list with 3 notification items', () => {
    render(<Notifications />);

    const button = screen.getByRole('button');
    const items = screen.getAllByRole('listitem');

    expect(button).toBeInTheDocument();
    expect(items).toHaveLength(3);
  });
});