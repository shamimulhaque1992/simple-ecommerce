import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p>${price.toFixed(2)}</p>
      <button
        onClick={() =>
          dispatch(addToCart({ id, title, price, image, quantity: 1 }))
        }
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
