/* eslint-disable no-unused-vars */
import React from "react";

type PaginationButtonProps = {
  setPage: (page: number) => void;
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled?: boolean;
  currentPage: number;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  setPage,
  isPreviousButtonDisabled,
  isNextButtonDisabled,
  currentPage,
}) => {
  return (
    <div className="join py-3 flex justify-center">
      <button
        className="join-item btn btn-sm"
        onClick={() => setPage(currentPage - 1)}
        disabled={isPreviousButtonDisabled}
      >
        «
      </button>
      <button className="join-item btn btn-sm">Page {currentPage}</button>
      <button
        className="join-item btn btn-sm"
        onClick={() => setPage(currentPage + 1)}
        disabled={isNextButtonDisabled}
      >
        »
      </button>
    </div>
  );
};

export default PaginationButton;
