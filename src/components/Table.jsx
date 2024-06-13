import React, { useEffect, useState } from 'react';
import { useFilterHook } from './useFilterHook';
import Pagination from './Pagination';
import styled from 'styled-components';

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
`;

const TheadStyled = styled.thead`
  background-color: #f7f7f7;
  color: #333;
  text-align: left;
`;

const TbodyStyled = styled.tbody`
  tr {
    :hover {
      background-color: #f2f2f2;
    }
  }
  td {
    padding: 1rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #ddd;
  }
`;

const PaginationStyled = styled(Pagination)`
  margin-top: 1rem;
`;

const Th = ({ width, sortBy, sortOrder, setSortBy, setSortOrder, children, sortKey, listName }) => {
    const handleClick = () => {
        let newSortOrder = 'ASC';
        if (sortBy === sortKey) {
            newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
        }
        setSortBy(listName, 'sortBy', sortKey);
        setSortOrder(listName, 'order', newSortOrder);
    };

    return (
        <th className="text-center" style={{ width: `${width}`, fontSize: '0.71rem' }} onClick={handleClick}>
            {children} {sortBy === sortKey && (sortOrder === 'ASC' ? '↑' : '↓')}
        </th>
    );
};

const SearchInput = ({ width, id, name, value, onChange, placeholder = 'جستجو...' }) => {
    return (
        <th width={width} className="p-0 m-0">
            <input type="search" id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
        </th>
    );
};

const Table = ({ columns, listName, fetchDataFunction }) => {
    const { filters,setPage,addSearch, setOrder, setOrderBy, setTotalPages, setTotalElements } = useFilterHook();
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const  fetch = async () => {
            return await fetchDataFunction();
        }

        fetch().then(result => {
            setData(result.data?.content);
            setTotalElements(listName, result.data.totalElements);
            setTotalPages(listName, result.data.totalPages);
            setPage(listName, result.data.pageable.page);
            setOrder(listName, 'order', result.data.pageable.sort.direction)
        })
    }, [filters[listName]?.search, filters[listName]?.pageable?.page, filters[listName]?.pageable?.size, filters[listName]?.pageable?.order, filters[listName]?.pageable?.orderBy]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        addSearch(listName, 'search', e.target.value);
        setPage(listName, 0);
    };

    return (
        <TableWrapper>
            <TableStyled>
                <TheadStyled>
                    <tr>
                        {columns.map((column) => (
                            <Th
                                key={column.key}
                                width={column.width}
                                sortBy={filters[listName]?.pageable?.sortBy}
                                sortOrder={filters[listName]?.pageable?.order}
                                setSortBy={setOrderBy}
                                setSortOrder={setOrder}
                                sortKey={column.key}
                                listName={listName}
                            >
                                {column.title}
                            </Th>
                        ))}
                        <th width="10%">
                            <SearchInput
                                width="100%"
                                id="search"
                                name="search"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search..."
                            />
                        </th>
                    </tr>
                </TheadStyled>
                <TbodyStyled>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </TbodyStyled>
            </TableStyled>
            <PaginationStyled listName={listName} />
        </TableWrapper>
    );
};

export default Table;
