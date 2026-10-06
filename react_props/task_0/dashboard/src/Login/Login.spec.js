import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  it('renders 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);
    const labels = screen.getAllByText((content, element) => element.tagName.toLowerCase() === 'label');
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  it('focuses input element when related label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();
  });
});