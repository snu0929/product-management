import React, { useState, useEffect } from "react";
import "./AddProductModal.css";

const products = [
  "Pipes",
  "Tubing",
  "Pipe Fittings",
  "Forged Fittings",
  "Flanges",
  "Valves",
  "Gaskets",
  "Instrumentation Fittings",
  "Sheet & Plates",
  "Bars",
  "Electrodes",
  "Fasteners",
  "Bolts",
  "Channels",
];
const materials = [
  "Alloy Steel",
  "Aluminium",
  "Carbon Steel",
  "Copper Nickel",
  "Duplex Steel",
  "Hastelloy",
  "Incoloy",
  "Inconel",
  "Low Temperature Carbon Steel",
  "Monel",
  "Nickel Alloy",
  "Stainless Steel",
  "Super Duplex Steel",
  "Titanium",
];
const grades = ["F1", "F5", "F8", "F12", "F15", "F36", "F83", "F92"];

const AddProductModal = ({ onClose, onSubmit }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [availableGrades, setAvailableGrades] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);

  useEffect(() => {
    if (selectedProduct && selectedMaterial) {
      setAvailableGrades(
        grades.map((grade) => `${selectedMaterial} ${grade} ${selectedProduct}`)
      );
    } else {
      setAvailableGrades([]);
    }
  }, [selectedProduct, selectedMaterial]);

  const handleGradeChange = (grade) => {
    setSelectedGrades((prevGrades) =>
      prevGrades.includes(grade)
        ? prevGrades.filter((g) => g !== grade)
        : [...prevGrades, grade]
    );
  };

  const handleSubmit = () => {
    if (selectedProduct && selectedMaterial && selectedGrades.length > 0) {
      const newProduct = {
        product: ` ${selectedGrades.join(", ")} `, // Combine material, grades, and product
        material: selectedMaterial, // Store the material separately
        grade: selectedGrades.map((g) => g.split(" ")[1]).join(", "),
        shape: "",
        length: "",
        thickness: "",
        surface_finish: "",
        outside_dia: "",
        price: "", // Default price or leave it empty
      };

      onSubmit(newProduct); // Pass the newProduct to the parent component
      onClose(); // Close the modal
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Add Products</h2>
        <div className="columns">
          <div className="column">
            <h3>Products</h3>
            <div className="scrollable-list">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`list-item ${
                    selectedProduct === product ? "selected" : ""
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product}
                </div>
              ))}
            </div>
          </div>
          <div className="column">
            <h3>Material</h3>
            <div className="scrollable-list">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className={`list-item ${
                    selectedMaterial === material ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMaterial(material)}
                >
                  {material}
                </div>
              ))}
            </div>
          </div>
          <div className="column">
            <h3>Grades</h3>
            <div className="scrollable-list">
              {availableGrades.map((grade, index) => (
                <label key={index} className="checkbox-container">
                  {grade}
                  <input
                    type="checkbox"
                    checked={selectedGrades.includes(grade)}
                    onChange={() => handleGradeChange(grade)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          onSubmit={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
