import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/api', () => ({
  fetchCards: jest.fn().mockResolvedValue([]),
  createCard: jest.fn(),
  deleteCard: jest.fn(),
  updateCard: jest.fn(),
}));

test('renders SuperFlash brand in navbar', () => {
  render(<App />);
  const titles = screen.getAllByText(/SuperFlash/i);
  expect(titles.length).toBeGreaterThan(0);
});
