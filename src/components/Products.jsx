import React from 'react';
import { useHttp } from './useHttp';
import { useFilterHook } from './useFilterHook';
import Table from './Table';

const Products = () => {
    const http = useHttp();
    const listName = 'products';
    const { getParams } = useFilterHook();

    const getAllProducts = async () => {
        try {
            return  await http.get(`/products?${getParams(listName).toString()}`);

        } catch (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }
    };

    const columns = [
        { key: 'id', title: 'شناسه', width: '5%', sortable: true },
        { key: 'productCode', title: 'کد محصول', width: '15%', sortable: true, searchable: true },
        { key: 'productName', title: 'نام محصول', width: '20%', sortable: true, searchable: true },
        { key: 'measurementIndex', title: 'شاخص اندازه‌گیری', width: '20%', sortable: true, searchable: true },
    ];

    return (
        <div>
            <h1>Products</h1>
            <Table listName={listName} fetchDataFunction={getAllProducts} columns={columns} />
        </div>
    );
};

export default Products;
