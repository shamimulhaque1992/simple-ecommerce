import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ProductCard from "./ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 50,
    image: "https://via.placeholder.com/150",
  };

  it("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50\.00/)).toBeInTheDocument();
    expect(screen.getByAltText(/test product/i)).toHaveAttribute(
      "src",
      mockProduct.image
    );
  });

  it('adds product to cart when "Add to Cart" is clicked', () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    );

    const addToCartButton = screen.getByText(/add to cart/i);
    fireEvent.click(addToCartButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(mockProduct.id);
  });
});
