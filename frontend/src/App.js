import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSearchQuery,
  setSelectedProduct,
  setSelectedMaterial,
  addProduct,
} from "./redux/productSlice";
import "./styles.css";

import AddProductModal from "./components/AddProductModal";
import EditForm from "./components/EditForm";

const App = () => {
  const dispatch = useDispatch();
  const { products, searchQuery, selectedProduct, selectedMaterial } =
    useSelector((state) => state.products);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isModalOpen, setModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null); // State to track expanded row
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleProductChange = (e) => {
    dispatch(setSelectedProduct(e.target.value));
  };

  const handleMaterialChange = (e) => {
    dispatch(setSelectedMaterial(e.target.value));
  };

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const sortProducts = (products) => {
    if (!sortField) return products;
    return products.slice().sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.product.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedProduct ? product.product.includes(selectedProduct) : true) &&
      (selectedMaterial ? product.material === selectedMaterial : true)
  );

  const sortedProducts = sortProducts(filteredProducts);

  const handleAddProduct = async (productData) => {
    await dispatch(addProduct(productData));
    dispatch(fetchProducts()); // Fetch updated products
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  return (
    <div className="container">
      <header className="header">
        <button className="add-button" onClick={() => setModalOpen(true)}>
          + Add Products
        </button>
        <div className="product-count">280/400 Products</div>
      </header>
      <input
        type="text"
        placeholder="Search Products..."
        className="search-input"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="search-btn">Search</button>
      <div className="filter-container">
        <select
          className="filter-dropdown"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">Products</option>
          <option value="Pipe">Pipe</option>
          <option value="Tubing">Tubing</option>
          <option value="Flanges">Flanges</option>
          <option value="Valves">Valves</option>
          <option value="Gasket">Gasket</option>
          <option value="Instrumentation Fittings">
            Instrumentation Fittings
          </option>
          <option value="Fasteners">Fasteners</option>
          <option value="Elbows">Elbows</option>
          <option value="Sheets">Sheets</option>
          <option value="Plates">Plates</option>
          <option value="Bolts">Bolts</option>
          <option value="Forged Fittings">Forged Fittings</option>
        </select>
        <select
          className="filter-dropdown"
          value={selectedMaterial}
          onChange={handleMaterialChange}
        >
          <option value="">Materials</option>
          <option value="Stainless Steel">Stainless Steel</option>
          <option value="Carbon Steel">Carbon Steel</option>
          <option value="Duplex Steel">Duplex Steel</option>
          <option value="Hastelloy">Hastelloy</option>
          <option value="Incoloy">Incoloy</option>
          <option value="Inconel">Inconel</option>
          <option value="Copper Nickel">Copper Nickel</option>
          <option value="Titanium">Titanium</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Nickel">Nickel</option>
          <option value="Monel">Monel</option>
          <option value="Alloy Steel">Alloy Steel</option>
          <option value="Super Duplex Steel">Super Duplex Steel</option>
          <option value="Aluminium">Aluminium</option>
        </select>
        <button className="filter-button">Filter</button>
        <button className="bulk-action-button">Bulk Actions</button>
        <button className="apply-button">Apply</button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("product")}>
              Products ▲
              {sortField === "product" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th>Action</th>
            <th>Product Details</th>
            <th onClick={() => handleSort("price")}>
              Price in Unit ▲
              {sortField === "price" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <React.Fragment key={product.id}>
              {expandedRow !== product.id && (
                <tr>
                  <td>{product.product}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => setExpandedRow(product.id)}
                    >
                      Quick Edit
                    </button>{" "}
                    |
                    <button
                      className="action-button"
                      onClick={() => setExpandedRow(product.id)}
                    >
                      Add Product Details
                    </button>
                  </td>
                  <td className="extra-info">
                    Material: {product.material} <br />
                    Unit Length: {product.length}
                    <br />
                    Shape: {product.shape}....
                  </td>
                  <td>{product.price}</td>
                </tr>
              )}
              {expandedRow === product.id && (
                <tr>
                  <td colSpan="4">
                    <EditForm
                      onCancel={() => setExpandedRow(null)}
                      product={product}
                    />
                    {/* <button onClick={() => setExpandedRow(null)}>Close</button> */}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default App;
