import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { RootState } from "../redux/store";

const CartPage: React.FC = () => {
  // Get the cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container p-8">
      {/* Heading for the cart page */}
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Render cart items */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {/* Display total price */}
          <div className="text-right mt-4">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
