import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  it('renders 2 labels, 2 inputs, and 1 button element', () => {
    render(<Login />);

    const labels = screen.getAllByText((content, element) => element.tagName.toLowerCase() === 'label');
    const inputs = screen.getAllByRole('textbox', { hidden: true }); // includes type="email"
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button');

    expect(labels).toHaveLength(2);
    expect(document.querySelectorAll('input')).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  it('verifies that input gets focused when clicking corresponding label', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(emailInput).not.toHaveFocus();
    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();
  });
});