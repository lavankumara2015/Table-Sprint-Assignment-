import "./index.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubCategory({ content, icon }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obj = {
      Category: "categories",
      Subcategory: "subcategories2",
      Products: "productdata",
    };
    axios
      .get(`http://localhost:3007/${obj[content]}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [content]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3007/delete`, {
        data: { id, content },
      })
      .then((res) => {
        console.log(res.data.message);
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting subcategory:", err);
      });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.image_url}
        alt={rowData.category_name}
        style={{ width: "1rem" }}
      />
    );
  };

  const handleClick = () => {
    navigate("/addCategory");
  };

  const handleSearch = (e) => {
    const searchValue = e.toLowerCase();
    const filteredResults = data.filter(
      (value) =>
        value.id.toString().includes(searchValue) ||
        (value.productname &&
          value.productname.toLowerCase().includes(searchValue)) ||
        (value.subcategoryname &&
          value.subcategoryname.toLowerCase().includes(searchValue)) ||
        (value.category_name &&
          value.category_name.toLowerCase().includes(searchValue))
    );
    setFilteredData(filteredResults);
  };

  return (
    <div>
      <div className="subCategory-container">
        <div className="subCategory-container2">
          <img src={icon} alt="Subcategory icon" />
          <p> {content}</p>
          <input
            type="text"
            placeholder={`Search ${content}`}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Add {content}</button>
      </div>

      <div>
        <DataTable
          value={filteredData}
          style={{ overflowX: "scroll", height: "9rem" }}
        >
          <Column field="id" header="Id" sortable />
          {content === "Subcategory" && (
            <Column field="subcategoryname" header="Sub Category" />
          )}
          {content === "Products" && (
            <Column field="productname" header="Product Name" />
          )}
          {content === "Products" && (
            <Column field="subcategory" header="Subcategory" />
          )}
          <Column field="category_name" header="Category Name" sortable />
          {content === "Category" && (
            <Column field="image_url" header="Image" body={imageBodyTemplate} />
          )}
          {content === "Subcategory" && (
            <Column field="image_url" header="Image" body={imageBodyTemplate} />
          )}

          <Column
            header="Status"
            body={(rowData) => (
              <span
                style={{ color: rowData.status === "active" ? "green" : "red" }}
              >
                {rowData.status}
              </span>
            )}
            sortable
          />
          {content === "Category" && (
            <Column field="sequence" header="Sequence" sortable />
          )}
          {content === "Subcategory" && (
            <Column field="sequence" header="Sequence" sortable />
          )}
          <Column
            header="Action"
            body={(rowData) => (
              <img
                src="./assets/Group 2609075.png"
                className="deleteImg"
                onClick={() => handleDelete(rowData.id)}
                alt="Delete"
              />
            )}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default SubCategory;
