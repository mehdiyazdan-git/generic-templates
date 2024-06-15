import  { useEffect, useState } from 'react';
import useGenericFilterHook from "./useGenericFilterHook.js";
import ProductTable from './ProductTable.jsx';
import Pagination from './Pagination.jsx';

const Products = () => {
    const [data, setData] = useState([]);
    // Initialize filter hook for products
    const { filter, updateFilter } = useGenericFilterHook('products', {
        productName: '',
        productCode: '',
        productType: '',
        page: 0,
        size: 5,
        sortBy: "id",
        order: "asc",
        totalPages: 1,
        totalElements: 0,
    });

    const fetchProducts = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const searchParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                searchParams.append(key, value);
            }
        });

        try {
            const response = await fetch(`http://localhost:9090/api/products?${searchParams.toString()}`, requestOptions);
            const result = await response.json();
            setData(result.content);
            updateFilter({
                totalPages: result.totalPages,
                totalElements: result.totalElements,
                page: result.pageable.pageNumber, // Ensure this matches the server response
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filter.page, filter.size, filter.sortBy, filter.order, filter.productName, filter.productCode, filter.productType]);

    return (
        <div className="container-fluid">
            <ProductTable data={data} filter={filter} updateFilter={updateFilter} />
            <Pagination entity={'products'} filter={filter} updateFilter={updateFilter} />
        </div>
    );
};

export default Products;
