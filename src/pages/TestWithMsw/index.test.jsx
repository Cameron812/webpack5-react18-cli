import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TestWithMsw from './index';

test('should show full name when type', async () => {
  render(<TestWithMsw />);
  const appendText = ' Welcome!';
  const input = await screen.findByPlaceholderText('Type your name');
  await userEvent.type(input, appendText);

  const text = screen.getByText(/welcome/i);
  expect(text).toMatchInlineSnapshot(`
    <span>
      Wyatt Powell Welcome!
    </span>
  `);
});

test('should display full name from api directly', async () => {
  render(<TestWithMsw />);
  const text = await screen.findByText(/Wyatt Powell/);
  expect(text).toBeInTheDocument();
});
