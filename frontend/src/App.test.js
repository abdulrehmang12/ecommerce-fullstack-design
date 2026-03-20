import { render, screen } from '@testing-library/react';
import App from './App';

test('renders storefront shell', () => {
  render(<App />);
  expect(screen.getByText(/Global wholesale marketplace/i)).toBeInTheDocument();
});
