import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePageCount = 5; // 마지막에 보여줄 페이지 수

  const pageNumbers = React.useMemo(() => {
    if (totalPages <= visiblePageCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const lastFive = Array.from({ length: visiblePageCount }, (_, i) => totalPages - visiblePageCount + 1 + i);
      return lastFive;
    }
  }, [totalPages]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-start items-center gap-6">
      <div
        className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[63px] h-[63px] relative gap-2.5 pl-8 pr-[30px] py-[30px] rounded-[43.5px] bg-white cursor-pointer"
        style={{ boxShadow: "0px 4px 12.300000190734863px 0 rgba(0,0,0,0.1)" }}
        onClick={handlePreviousClick}
      >
        <svg
          width={15}
          height={19}
          viewBox="0 0 15 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <path
            d="M13.5 17.5L1.5 9.5L13.5 1.5"
            stroke="#222222"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[60px] w-[auto] gap-2.5 px-7 py-2.5 rounded-[35px] bg-white border border-[#adbbd4]">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-7">
          {pageNumbers.map((page) => (
            <div
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-10 w-10 relative gap-2.5 px-[17px] py-[3px] rounded-full cursor-pointer ${currentPage === page ? 'bg-[#1e59ff]' : ''}`}
            >
              <p className={`flex-grow-0 flex-shrink-0 text-xl text-left ${currentPage === page ? 'text-white' : 'text-[#adbbd4]'}`}>{page}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[63px] h-[63px] relative gap-2.5 pl-8 pr-[30px] py-[30px] rounded-[43.5px] bg-white cursor-pointer"
        style={{ boxShadow: "0px 4px 12.300000190734863px 0 rgba(0,0,0,0.1)" }}
        onClick={handleNextClick}
      >
        <svg
          width={15}
          height={19}
          viewBox="0 0 15 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <path
            d="M1.5 1.5L13.5 9.5L1.5 17.5"
            stroke="#222222"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;