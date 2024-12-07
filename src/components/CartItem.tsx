import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity, image }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuantity = parseInt(e.target.value, 10);
    if (updatedQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: updatedQuantity }));
    }
  };

  return (
    <div className="flex items-center border-b py-4">
      <img src={image} alt={title} className="w-16 h-16 object-cover mr-4" />
      <div className="flex-1">
        <h2 className="font-bold">{title}</h2>
        <p>${price.toFixed(2)}</p>
      </div>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="w-12 border text-center mr-4"
      />
      <button
        onClick={() => dispatch(removeFromCart(id))}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
