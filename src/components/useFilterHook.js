import { useState, useEffect } from 'react';

const storage = window.sessionStorage;



export const useFilterHook = () => {
    const defaultFilter = (entity) => {
        return {
            entity: {
                search: {},
                pageable: {
                    page: 0,
                    size: 5,
                    order: 'ASC',
                    orderBy: 'id',
                }
            }
        }
    };
    const [filters, setFilters] = useState(() => {
        const storedFilters = sessionStorage.getItem('filters');
        return storedFilters ? JSON.parse(storedFilters) : {};
    });

    useEffect(() => {
        const storedFilters = storage.getItem('filters');
        if (storedFilters) {
            setFilters(JSON.parse(storedFilters));
        }
    }, []);
    useEffect(() => {
        storage.setItem('filters', JSON.stringify(filters));
    }, [filters]);
    const getFilters = (entity) => {
        if (Object.keys(filters).length === 0) {
            setFilters(defaultFilter(entity));
            return defaultFilter.entity;
        } else {
            return filters[entity] || {};
        }
    }

    const addFilter = (entity, filterName, filterValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                [filterName]: filterValue,
            },
        }));
    };

    const clearFilter = (entity, filterName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                [filterName]: null,
            },
        }));
    };

    const addSearch = (entity, searchName, searchValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                search: {
                    ...prevFilters[entity]?.search,
                    [searchName]: searchValue,
                },
            },
        }));
    };

    const clearSearch = (entity, searchName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                search: {
                    ...prevFilters[entity]?.search,
                    [searchName]: null,
                },
            },
        }));
    };

    const setPage = (entity, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    page,
                },
            },
        }));
    };

    const setSize = (entity, size) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    size,
                },
            },
        }));
    };

    const setOrder = (entity, order) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    order,
                },
            },
        }));
    };

    const setOrderBy = (entity, orderBy) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    orderBy,
                },
            },
        }));
    };

    const setPagination = (entity, page, size) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    page,
                    size,
                },
            },
        }));
    };

    const setTotalPages = (entity, totalPages) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    totalPages,
                },
            },
        }));
    };

    const setTotalElements = (entity, totalElements) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                pageable: {
                    ...prevFilters[entity]?.pageable,
                    totalElements,
                },
            },
        }));
    };
    const getPageable = (entity) => {
        const pageable = filters[entity]?.pageable;
        if (pageable) {
            return {
                page: pageable.page,
                size: pageable.size,
                order: pageable.order,
                orderBy: pageable.orderBy,
                totalPages: pageable.totalPages,
                totalElements: pageable.totalElements,
            };
        } else {
            return {
                page: 0,
                size: 10,
                order: 'ASC',
                orderBy: 'id',
                totalPages: 0,
                totalElements: 0,
            };
        }
    }
    const getParams = (entity) => {
        const searchParams = new URLSearchParams();
        const filters = getFilters(entity);
        if (!filters) {
            let defaultFilters = defaultFilter(entity);
            setFilters((prevFilters) => ({
                ...prevFilters,
                [entity]: defaultFilters,
            }));
        }
        Object.keys(filters).forEach((key) => {
            if (key === 'search') {
                Object.keys(filters.search).forEach((searchKey) => {
                    searchParams.append(`search_${searchKey}`, filters.search[searchKey]);
                });
            } else if (key === 'pageable') {
                searchParams.append('page', filters.pageable['page']);
                searchParams.append('size', filters.pageable['size']);
                searchParams.append('order', filters.pageable['order']);
                searchParams.append('orderBy', filters.pageable['orderBy']);
            } else {
                searchParams.append(key, filters[key]);
            }
        });
        return searchParams;
    };

    return {
        filters,
        addFilter,
        clearFilter,
        addSearch,
        clearSearch,
        setPage,
        setSize,
        setOrder,
        setOrderBy,
        setPagination,
        setTotalPages,
        setTotalElements,
        getPageable,
        getParams
    };
}
