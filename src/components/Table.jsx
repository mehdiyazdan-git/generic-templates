import React, {useEffect, useMemo, useRef, useState} from 'react';

    const Table = ({columns, fetchData,listName}) => {
        const tableRef = useRef(null);
        const [filter, setFilter] = useState({});
        const [sortBy, setSortBy] = useState(null);
        const [sortOrder, setSortOrder] = useState('ASC');
        const [search, setSearch] = useState('');
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const [data, setData] = useState([]);
        const [totalPages, setTotalPages] = useState(1);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [ searchParams, setSearchParams ] = useState({});

        const Th = ({width, sortBy, sortOrder, setSortBy, setSortOrder, children, sortKey, listName, setFilter}) => {
            const handleClick = () => {
                let newSortOrder = 'ASC';
                if (sortBy === sortKey) {
                    newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
                }
                setSortBy(sortKey);
                setSortOrder(newSortOrder);
                setFilter(listName, 'sortBy', sortKey);
                setFilter(listName, 'order', newSortOrder);
            };

            return (
                <th className="text-center" style={{width: `${width}`, fontSize: "0.71rem"}} onClick={handleClick}>
                    {children} {sortBy === sortKey && (sortOrder === 'ASC' ? '↑' : '↓')}
                </th>
            );
        };


        // implement renderBody
        const renderBody = ({rows}) => {
            const renderRow = (row) => {
                return (
                    <tr>
                        {row.cells.map((cell) => (
                            <td key={cell.key} className="text-center">
                                {cell.value}
                            </td>
                        ))}
                    </tr>
                );
            };
            return (
                <tbody>
                {rows.map((row) => renderRow(row))}
                </tbody>
            );
        };

        // implement renderPagination
        const renderPagination = () => {
            return (
                <div>
                    {/* Pagination will be added here */}
                </div>
            );
        };

        // implement renderSearch
        const renderSearch = () => {
            return (
                <div>
                    {/* Search input will be added here */}
                </div>
            );
        };

        // implement renderSort
        const renderSort = () => {
            return (
                <div>
                    {/* Sort options will be added here */}
                </div>
            );
        };

        // implement renderFilter
        const renderFilter = () => {
            return (
                <div>
                    {/* Filter options will be added here */}
                </div>
            );
        };
        const renderHeader = ({columns}) => {
            const handleSearchChange = (listName, value) => {
                setFilter(listName, 'search', value);
            };

            return (
                <thead>
                <tr>
                    {columns.map((column) => (
                        <Th
                            key={column.key}
                            width={column.width}
                            sortBy={column.sortable ? column.key : null}
                            sortOrder={column.sortable ? column.key : null}
                            setSortBy={column.sortable ? column.key : null}
                            setSortOrder={column.sortable ? column.key : null}
                            setFilter={column.searchable ? column.key : null}
                            listName={column.searchable ? column.key : null}
                        >
                            {column.title}

                        </Th>
                    ))}
                </tr>
                <tr>
                    {columns.map((column) => (
                        <SearchInput
                            key={column.key}
                            placeholder={`Search ${column.title}`}
                            onChange={(event) => handleSearchChange(column.key, event.target.value)}
                        />
                    ))}
                </tr>
                </thead>
            );
        };
        const SearchInput = ({width, id, name, value, onChange, placeholder = "جستجو..."}) => {
            function handleSearchChange(key, value) {
                setSearchParams((prevParams) => {
                    if (value.trim() === "") {
                        delete prevParams[key];
                    } else {
                        prevParams[key] = value;
                    }
                    return prevParams;
                });
            }
            return (
                <th width={width} className="p-0 m-0">
                    <input
                        type="search"
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => handleSearchChange(e.target.name, e.target.value)}
                        style={{
                            border: '1px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box',
                            minHeight: '35px',
                            margin: '0',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            textIndent: "0.5rem",
                            padding: "0 0.2rem",
                            borderRadius: "0.25rem",
                            fontSize: "0.7rem",
                            lineHeight: "1.0rem",
                            color: "#334155",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",

                            "&:focus": {
                                outline: "none",
                                borderColor: "#86b7fe",
                                boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
                            },
                            "&::placeholder": {
                                color: "#6b7280",
                                opacity: "1",
                                textIndent: "0.5rem",
                            },
                            "&:-webkit-autofill": {
                                boxShadow: "0 0 0 1000px rgba(255, 255, 255, 0.5) inset",

                                "&:focus": {
                                    borderColor: "#86b7fe",
                                    boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
                                },
                            },
                            "&:disabled": {
                                cursor: "not-allowed",
                                backgroundColor: "#e5e7eb",
                                borderColor: "#d1d5db",
                                opacity: 0.5,
                            },

                        }}
                    />
                </th>
            );
        };

        useEffect(() => {
            // fetchData will be called here
            fetchData();
        }, [fetchData]);
        const renderTable = () => {
            return (
                <div>
                    <table ref={tableRef}>
                        {renderHeader()}
                        {renderBody()}
                        {renderPagination()}
                        {renderSearch()}
                        {renderSort()}
                        {renderFilter()}
                    </table>
                </div>
            );
        };

        return renderTable();
    }
