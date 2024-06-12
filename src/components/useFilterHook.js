import { useState, useEffect } from 'react';

export const useFilterHook = () => {
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
    const [year, setYear] = useState(null);

    const storage = window.sessionStorage;

    useEffect(() => {
        const storedFilters = storage.getItem('filters');
        if (storedFilters) {
            setFilters(JSON.parse(storedFilters));
        }
    }, []);

    useEffect(() => {
        storage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    const addFilter = (listName, filterName, filterValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [listName]: {
                ...prevFilters[listName],
                [filterName]: filterValue,
            },
        }));
    };

    const clearFilter = (listName, filterName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [listName]: {
                ...prevFilters[listName],
                [filterName]: null,
            },
        }));
    };

    const addSearch = (listName, searchName, searchValue) => {
        setSearch((prevSearch) => ({
            ...prevSearch,
            [listName]: {
                ...prevSearch[listName],
                [searchName]: searchValue,
            },
        }));
    };

    const clearSearch = (listName, searchName) => {
        setSearch((prevSearch) => ({
            ...prevSearch,
            [listName]: {
                ...prevSearch[listName],
                [searchName]: null,
            },
        }));
    };

    const addFilterToSearch = (listName, filterName, searchName, searchValue) => {
        addFilter(listName, filterName, searchValue);
        addSearch(listName, searchName, searchValue);
    };

    const removeFilterFromSearch = (listName, filterName, searchName) => {
        clearFilter(listName, filterName);
        clearSearch(listName, searchName);
    };

    const excludeFilterFromSearch = (listName, filterName, searchName, searchValue) => {
        clearFilter(listName, filterName);
        addSearch(listName, searchName, searchValue);
    };

    const doFilterWithoutYear = (listName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [listName]: {
                ...prevFilters[listName],
                year: null,
            },
        }));
    };

    const setYears = (year) => {
        setYear(year);
        setFilters((prevFilters) => ({
            ...prevFilters,
            years: {
                jalaliYear: {
                    label: year,
                    value: year,
                },
            },
        }));
    };

    const getYears = () => {
        return filters.years.jalaliYear.value;
    };

    useEffect(() => {
        console.log("Filters updated:", filters);
    }, [filters]);

    return {
        filters,
        search,
        year,
        addFilter,
        clearFilter,
        addSearch,
        clearSearch,
        addFilterToSearch,
        removeFilterFromSearch,
        excludeFilterFromSearch,
        doFilterWithoutYear,
        setYears,
        getYears,
    };
};
