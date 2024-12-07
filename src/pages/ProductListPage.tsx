import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  url: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const [postsResponse, photosResponse] = await Promise.all([
    axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts"),
    axios.get<Photo[]>("https://jsonplaceholder.typicode.com/photos"),
  ]);

  return postsResponse.data.slice(0, 100).map((post, index) => ({
    id: post.id,
    title: post.title,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    image: photosResponse.data[index]?.url || "",
  }));
};

const ProductListPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<Product[]>(
    "products",
    fetchProducts
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center text-red-500">Failed to load products.</div>
    );

  const totalPages = Math.ceil(data!.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data!.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {paginatedData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 flex-wrap gap-5 md:gap-3 lg:gap-0">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
