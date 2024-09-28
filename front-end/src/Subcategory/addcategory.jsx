import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("active");
  const [sequence, setSequence] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      category_name: categoryName,
      image_url: imageUrl,
      status: status,
      sequence: sequence,
    };

    axios
      .post("http://localhost:3007/addCategories", newCategory)
      .then((response) => {
        setCategoryName("");
        setImageUrl("");
        setStatus("active");
        setSequence("");  
        alert("Data added Successfully")
        navigate("/dashboard")
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });


  };

  return (
    <div className="add-section">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="addCategoryForm">
          <h2>Add New Category</h2>

          <label htmlFor="category_name">Category Name</label>
          <input
            type="text"
            id="category_name"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          
          {imageUrl && (
            <div className="image-preview">
            <img src={imageUrl} alt="Preview" />
            </div>
          )}
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <label htmlFor="sequence">Sequence</label>
          <input
            type="text"
            id="sequence"
            placeholder="Enter Sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
