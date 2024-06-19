import React from 'react';
import './Pagination.styles.css'; // Ensure you have corresponding CSS for styling

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (totalPages: number) => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pages = getPageNumbers(totalPages);

  return (
    <div className='pagination-container'>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            key={page}
            className={`pagination-item ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
