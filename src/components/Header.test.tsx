import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from './Header';

describe('Header Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it('shows the correct cart item count', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const cartBadge = screen.getByText(/cart/i).parentElement?.querySelector('span');
    expect(cartBadge).toHaveTextContent('0');
  });
});
