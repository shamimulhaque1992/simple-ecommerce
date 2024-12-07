import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <header className="bg-blue-600">
      <section className="container p-8 text-white flex justify-between">
        <Link to="/">
          <h1 className="text-lg font-bold">E-Commerce</h1>
        </Link>
        <nav>
          <Link to="/" className="mr-4">
            Products
          </Link>
          <Link to="/cart">
            Cart{" "}
            <span className="bg-red-500 rounded-full px-2">{cartCount}</span>
          </Link>
        </nav>
      </section>
    </header>
  );
};

export default Header;
