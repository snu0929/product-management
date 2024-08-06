import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "../redux/productSlice";
import ProductModal from "./AddProductModal";
import "./styles.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
    setShowModal(false);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setShowModal(true)}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product} - {product.material} - {product.price}
          </li>
        ))}
      </ul>
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;
