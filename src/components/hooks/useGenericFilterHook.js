
    // useGenericFilterHook.js

    import {useState, useEffect} from 'react';

    const useGenericFilterHook = (entityName, initialValues) => {
        const storageKey = `filter_${entityName}`;

        // Load filter values from sessionStorage on component mount
        const storedFilter = sessionStorage.getItem(storageKey);
        const initialFilter = storedFilter ? JSON.parse(storedFilter) : initialValues;

        const [filter, setFilter] = useState(initialFilter);

        // Function to update filter parameters
        const updateFilter = (newValues) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                ...newValues,
            }));

        };

        // Function to reset filter to initial values
        const resetFilter = () => {
            setFilter(initialValues);
        };


        // Save filter values to sessionStorage whenever filter changes
        useEffect(() => {
            sessionStorage.setItem(storageKey, JSON.stringify(filter));
        }, [filter, storageKey]);

        return {
            filter,
            updateFilter,
            resetFilter,
        };
    };

    export default useGenericFilterHook;
