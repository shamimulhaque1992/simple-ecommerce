import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      {/* Render the Header component */}
      <Header />
      <main className="p-4">
        {/* Define Routes for different pages */}
        <Routes>
          {/* Product list page route */}
          <Route path="/" element={<ProductListPage />} />
          {/* Cart page route */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
