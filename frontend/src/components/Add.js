import React, { useState } from "react";
import "../App.css";

const Add = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    setErrors({});

    const newErrors = {};
    if (!category) {
      newErrors.category = "Category is required";
    }
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(price)) {
      newErrors.price = "Price must be a valid number";
    }
    if (!image) {
      newErrors.image = "Image URL is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;  // this return prevent the program for further process
    }

    const data = {
      category: category,
      name: name,
      price: price,
      image: image,
    };

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        // clear the input field after data sent to server
        setCategory("");
        setName("");
        setPrice("");
        setImage("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="proAdd">
      <h2 className="title">Add Product</h2>
      Category :
      <input
        className="input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {errors.category && (
        <p className="error" style={{ color: "red" }}>
          {errors.category}
        </p>
      )}
      <br />
      Name of Product :
      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && (
        <p className="error" style={{ color: "red" }}>
          {errors.name}
        </p>
      )}
      <br />
      Price : 
      <input
        type="text"
        className="input"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {errors.price && (
        <p className="error" style={{ color: "red" }}>
          {errors.price}
        </p>
      )}
      <br />
      Image URL :{" "}
      <input
        type="text"
        className="input"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      {errors.image && (
        <p className="error" style={{ color: "red" }}>
          {errors.image}
        </p>
      )}
      <button
        type="submit"
        className="btn3"
        onClick={handleSubmit}
        style={{ color: "white" }}
      >
        Add
      </button>
    </div>
  );
};

export default Add;
