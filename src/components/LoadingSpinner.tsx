import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div role="status" className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
