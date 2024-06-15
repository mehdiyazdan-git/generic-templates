import React from 'react';
import PropTypes from 'prop-types';

const ProductTable = ({ data, filter, updateFilter }) => {

    const handleFilterChange = ({ target: { name, value } }) => {
        updateFilter({ [name]: value, 'page' : 0 });
    };

    return (
        <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center" }}>
            <tr>
                <th>Product Name</th>
                <th>Product Code</th>
                <th>Product Type</th>
            </tr>
            <tr className="search-inputs">
                <td>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Search by name"
                        value={filter.productName}
                        onChange={handleFilterChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="productCode"
                        placeholder="Search by code"
                        value={filter.productCode}
                        onChange={handleFilterChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="productType"
                        placeholder="Search by type"
                        value={filter.productType}
                        onChange={handleFilterChange}
                    />
                </td>
            </tr>
            </thead>
            <tbody>
            {data.map((product) => (
                <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.productCode}</td>
                    <td>{product.productType}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

ProductTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            productCode: PropTypes.string.isRequired,
            productType: PropTypes.string.isRequired,
        })
    ).isRequired,
    filter: PropTypes.shape({
        productName: PropTypes.string,
        productCode: PropTypes.string,
        productType: PropTypes.string,
    }).isRequired,
    updateFilter: PropTypes.func.isRequired,
};

export default ProductTable;
