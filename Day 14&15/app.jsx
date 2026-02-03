import React, { useState, useEffect } from 'react';

const ALL_PRODUCTS = [
  { id: 101, name: 'AI Caption Generator', category: 'Software', price: 99.99 },
  { id: 102, name: 'Data Analysis Service', category: 'Service', price: 299.00 },
  { id: 103, name: 'Git Training Course', category: 'Education', price: 49.50 },
  { id: 104, name: 'B-Tree Visualization Tool', category: 'Software', price: 150.00 },
  { id: 105, name: 'LinkedIn Profile Audit', category: 'Service', price: 75.00 },
];

const fetchProducts = async (query = '') => {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!query) {
    return ALL_PRODUCTS;
  }

  const lowerCaseQuery = query.toLowerCase();
  return ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery)
  );
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts(searchTerm)
      .then(data => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found for "{searchTerm}".</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Category: <strong>{product.category}</strong></p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;