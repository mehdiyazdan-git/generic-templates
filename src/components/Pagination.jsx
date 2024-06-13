import React from 'react';
import { useFilterHook } from './useFilterHook';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  margin: 0 1rem;
`;

const Pagination = ({ listName }) => {
    const { setPage, setSize, getPageable } = useFilterHook();
    const pageable = getPageable(listName);
    const { page, size, totalPages, totalElements } = pageable;

    const handleFirstPage = () => setPage(listName, 1);
    const handlePrevPage = () => setPage(listName, Math.max(1, page - 1));
    const handleNextPage = () => setPage(listName, Math.min(totalPages, page + 1));
    const handleLastPage = () => setPage(listName, totalPages);

    const startIndex = (page - 1) * size + 1;
    const endIndex = Math.min(page * size, totalElements);

    return (
        <>
            <PaginationWrapper>
                <PaginationButton onClick={handleFirstPage} disabled={page <= 1}>
                    &lt;&lt;
                </PaginationButton>
                <PaginationButton onClick={handlePrevPage} disabled={page <= 1}>
                    &lt;
                </PaginationButton>
                <PaginationInfo>
                    Page {page} of {totalPages}
                </PaginationInfo>
                <PaginationButton onClick={handleNextPage} disabled={page >= totalPages}>
                    &gt;
                </PaginationButton>
                <PaginationButton onClick={handleLastPage} disabled={page >= totalPages}>
                    &gt;&gt;
                </PaginationButton>
                <PaginationInfo>
                    {startIndex} to {endIndex} of {totalElements}
                </PaginationInfo>
            </PaginationWrapper>
        </>
    );
};

export default Pagination;
