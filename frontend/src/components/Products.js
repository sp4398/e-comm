import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const uniqueCategories = [
    ...new Set(result.map((product) => product.category)),
  ];

  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        setFilteredResult(data);
        console.log(filteredResult);
      });
  }, []);

  useEffect(() => {
    const filteredItems = result.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResult(filteredItems);
  }, [searchText, result]);

  // delete
  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:3001/products/${itemId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data deleted successfully");
            setResult(result.filter((item) => item.id !== itemId));
          } else {
            console.error("Failed to delete data");
          }
        })
        .catch((error) => console.error("Error deleting data: ", error));
    }
  };

  const filteredProducts = selectedCategory
    ? filteredResult.filter((product) => product.category === selectedCategory)
    : filteredResult;

  return (
    <div className="body">
      <div className="filter">
        {" "}
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          style={{
            height: "25px",
            border: "2px solid black",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory || ""}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="search">
        <input
          type="text"
          value={searchText}
          placeholder="Search An Item"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style={{
            height: "25px",
            border: "2px solid black",
            borderRadius: "5px",
          }}
        />
        <button className="search-btn">Search</button>
      </div>
      <div className="card-container">
        {filteredProducts.map((d) => (
          <div className="card" key={d._id} style={{ borderRadius: "5px" }}>
            <p>Category: {d.category}</p>
            <img src={d.image} alt={d.name} className="img" />
            <h4>{d.name}</h4>
            <p>&#8377; {d.price}</p>
            <div className="btn">
              <Link to={`/edit/${d._id}`}>
                <button style={{ color: "white" }}>Edit</button>
              </Link>

              <button
                className="btn1"
                onClick={() => handleDelete(d._id)}
                style={{ color: "white" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
