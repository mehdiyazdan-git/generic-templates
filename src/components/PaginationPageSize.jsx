import styled from "styled-components";
import React from "react";

const PaginationPageSizeSelect = styled.select`
  margin: 0 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #337ab7;
  }
`;

const PaginationPageSizeOption = styled.option`
  padding: 5px;
`;

const PaginationPageSizeLabel = styled.label`
  margin: 0 10px;
`;

const PaginationPageSizeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationPageSize = ({ entity, size, setSize }) => {
    const handleChange = (e) => {
        setSize(entity, parseInt(e.target.value));
    };

    return (
        <PaginationPageSizeWrapper>
            <PaginationPageSizeLabel>Page Size:</PaginationPageSizeLabel>
            <PaginationPageSizeSelect value={size} onChange={handleChange}>
                <PaginationPageSizeOption value={10}>5</PaginationPageSizeOption>
                <PaginationPageSizeOption value={20}>10</PaginationPageSizeOption>
                <PaginationPageSizeOption value={50}>20</PaginationPageSizeOption>
            </PaginationPageSizeSelect>
        </PaginationPageSizeWrapper>

    );
}

export default PaginationPageSize;
