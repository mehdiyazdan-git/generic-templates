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

// eslint-disable-next-line react/prop-types
const Pagination = ({ updateFilter, filter  }) => {


    const handleFirstPage = () => updateFilter({ page: 0 });
    // eslint-disable-next-line react/prop-types
    const handlePrevPage = () => updateFilter({ page: Math.max(0, filter?.page - 1) });
    // eslint-disable-next-line react/prop-types
    const handleNextPage = () => updateFilter({ page: Math.min(filter?.totalPages - 1, filter?.page + 1) });
    // eslint-disable-next-line react/prop-types
    const handleLastPage = () => updateFilter({ page: filter?.totalPages - 1 });

    // eslint-disable-next-line react/prop-types
    const startIndex = filter?.page * filter?.size + 1;
    // eslint-disable-next-line react/prop-types
    const endIndex = Math.min((filter?.page + 1) * filter?.size, filter?.totalElements);

    return (
        <PaginationWrapper>
            {/* eslint-disable-next-line react/prop-types */}
            <PaginationButton onClick={handleFirstPage} disabled={filter?.page === 0}>
                &lt;&lt;
            </PaginationButton>
            {/* eslint-disable-next-line react/prop-types */}
            <PaginationButton onClick={handlePrevPage} disabled={filter?.page === 0}>
                &lt;
            </PaginationButton>
            <PaginationInfo>
                {/* eslint-disable-next-line react/prop-types */}
                Page {filter?.page + 1} of {filter?.totalPages}
            </PaginationInfo>
            {/* eslint-disable-next-line react/prop-types */}
            <PaginationButton onClick={handleNextPage} disabled={filter?.page >= filter?.totalPages - 1}>
                &gt;
            </PaginationButton>
            {/* eslint-disable-next-line react/prop-types */}
            <PaginationButton onClick={handleLastPage} disabled={filter?.page >= filter?.totalPages - 1}>
                &gt;&gt;
            </PaginationButton>
            <PaginationInfo>
                {/* eslint-disable-next-line react/prop-types */}
                {startIndex} to {endIndex} of {filter?.totalElements}
            </PaginationInfo>
        </PaginationWrapper>
    );
};

export default Pagination;
