import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/productSlice";
import "./EditForm.css";

const EditForm = ({ product, onCancel }) => {
  const [title, setTitle] = useState(product.product);
  const [price, setPrice] = useState(product.price);
  const [material, setMaterial] = useState(product.material);
  const [shape, setShape] = useState(product.shape);
  const [length, setLength] = useState(product.length);
  const [thickness, setThickness] = useState(product.thickness);
  const [surfaceFinish, setSurfaceFinish] = useState(product.surface_finish);
  const [outsideDia, setOutsideDia] = useState(product.outside_dia);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      product: title,
      price,
      material,
      shape,
      length,
      thickness,
      surface_finish: surfaceFinish,
      outside_dia: outsideDia,
    };

    dispatch(updateProduct({ id: product.id, updatedProduct })).then(() => {
      onCancel(); // Close the edit form after updating
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="quick-edit-section">
        <h3>Quick Edit</h3>
        <div className="title-price">
          <p>
            Title <span className="title">{title}</span>
          </p>
          <div className="price-input-group">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr className="custom-hr" />
      <div className="product-details-section">
        <h3>
          Product Details*{" "}
          <span className="req-field"> (Minimum 4 fields required) </span>
        </h3>
        <div className="product-details-inputs">
          <div className="input-group">
            <label>Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Shape</label>
            <input
              type="text"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Length</label>
            <input
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Thickness</label>
            <input
              type="text"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Surface Finish</label>
            <input
              type="text"
              value={surfaceFinish}
              onChange={(e) => setSurfaceFinish(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Outside Dia.</label>
            <input
              type="text"
              value={outsideDia}
              onChange={(e) => setOutsideDia(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="submit" className="submit-btn">
          Update
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
