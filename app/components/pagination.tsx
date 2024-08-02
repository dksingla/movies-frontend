
import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    const pageRange = 2; 

    for (let i = Math.max(1, page - pageRange); i <= Math.min(totalPages, page + pageRange); i++) {
      pageButtons.push(
        <button
          key={i}
          className={`text-white px-4 py-1 rounded text-sm sm:text-base ${page === i ? 'bg-primary' : 'bg-card'}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-center items-center mt-6 sm:mt-8">
      <button
        className="text-white px-4 py-2"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="flex items-center space-x-2 sm:space-x-3 mx-4">
        {renderPageButtons()}
      </div>
      <button
        className="text-white px-4 py-2"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
