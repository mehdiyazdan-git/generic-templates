import { useState, useEffect } from 'react';

const storage = window.sessionStorage;

export const useFilterHook = () => {
    const defaultFilter = (entity) => ({
        [entity]: {
            search: {},
            pageable: {
                page: 0,
                size: 5,
                order: 'ASC',
                orderBy: 'id',
                totalPages: 0,
                totalElements: 0,
            }
        }
    });

    const [filters, setFilters] = useState(() => {
        const storedFilters = storage.getItem('filters');
        return storedFilters ? JSON.parse(storedFilters) : {};
    });

    useEffect(() => {
        storage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    const getFilters = (entity) => {
        if (!filters[entity]) {
            const newFilter = defaultFilter(entity);
            setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
            return newFilter[entity];
        }
        return filters[entity];
    };

    const updateFilter = (entity, updater) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [entity]: {
                ...prevFilters[entity],
                ...updater(prevFilters[entity] || defaultFilter(entity)[entity]),
            },
        }));
    };

    const addFilter = (entity, filterName, filterValue) => {
        updateFilter(entity, (entityFilters) => ({ [filterName]: filterValue }));
    };

    const clearFilter = (entity, filterName) => {
        updateFilter(entity, (entityFilters) => ({ [filterName]: null }));
    };

    const addSearch = (entity, searchName, searchValue) => {
        updateFilter(entity, (entityFilters) => ({
            search: { ...entityFilters.search, [searchName]: searchValue },
        }));
    };

    const clearSearch = (entity, searchName) => {
        updateFilter(entity, (entityFilters) => ({
            search: { ...entityFilters.search, [searchName]: null },
        }));
    };

    const setPage = (entity, page) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, page },
        }));
    };

    const setSize = (entity, size) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, size },
        }));
    };

    const setOrder = (entity, order) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, order },
        }));
    };

    const setOrderBy = (entity, orderBy) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, orderBy },
        }));
    };

    const setPagination = (entity, page, size) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, page, size },
        }));
    };

    const setTotalPages = (entity, totalPages) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, totalPages },
        }));
    };

    const setTotalElements = (entity, totalElements) => {
        updateFilter(entity, (entityFilters) => ({
            pageable: { ...entityFilters.pageable, totalElements },
        }));
    };

    const getPageable = (entity) => {
        const pageable = getFilters(entity).pageable;
        return {
            page: pageable.page,
            size: pageable.size,
            order: pageable.order,
            orderBy: pageable.orderBy,
            totalPages: pageable.totalPages,
            totalElements: pageable.totalElements,
        };
    };

    const getParams = (entity) => {
        const searchParams = new URLSearchParams();
        const entityFilters = getFilters(entity);

        Object.entries(entityFilters).forEach(([key, value]) => {
            if (key === 'search') {
                Object.entries(value).forEach(([searchKey, searchValue]) => {
                    searchParams.append(`search_${searchKey}`, searchValue);
                });
            } else if (key === 'pageable') {
                Object.entries(value).forEach(([pageableKey, pageableValue]) => {
                    searchParams.append(pageableKey, pageableValue);
                });
            } else {
                searchParams.append(key, value);
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
};
