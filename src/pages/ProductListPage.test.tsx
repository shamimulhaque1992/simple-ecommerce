import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ProductListPage from "./ProductListPage";
import * as ReactQuery from "react-query";
import { vi } from "vitest";
const queryClient = new QueryClient();

describe("ProductListPage Component", () => {
  beforeEach(() => {
    vi.spyOn(ReactQuery, "useQuery").mockReturnValue({
      data: [
        { id: 1, title: "Product 1", price: 10.0, image: "image1.jpg" },
        { id: 2, title: "Product 2", price: 20.0, image: "image2.jpg" },
      ],
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      status: "success",
      refetch: vi.fn(),
    } as unknown as ReactQuery.UseQueryResult);
  });

  it("shows a loading spinner while fetching products", () => {
    vi.spyOn(ReactQuery, "useQuery").mockReturnValueOnce({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      isFetching: true,
      status: "loading",
      refetch: vi.fn(),
    } as unknown as ReactQuery.UseQueryResult);

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ProductListPage />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays products after loading", async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ProductListPage />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    const products = await screen.findAllByRole("heading", { level: 2 });
    expect(products.length).toBe(2);
  });
});
