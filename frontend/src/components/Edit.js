import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const Edit = () => {
  const { id } = useParams();
  console.log("ID received:", id); // Log the id parameter
  const [editedData, setEditedData] = useState({
    category: "",
    name: "",
    price: "",
    image: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditedData(data);
      });
  }, [id]);
  

  const handleSave = () => {
    if (isFormValid){
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data updated successfully");
          window.location.href = "/";
        } else {
          console.error("Failed to update data");
        }
      })
      .catch((error) => console.error("Error updating data: ", error));
    }else{
      console.error("Form has validation error")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: name==="price" ? parseFloat(value) || "": value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const errors={...formErrors}
    if(name==="category" || name==="name" || name==="image"){
      if (!value.trim()) {
        errors[name] = "This field is required";
      } else {
        delete errors[name];
      }
    }else if(name==="price"){
      if(!/^\d+(\.\d{1,2})?$/.test(value)){
        errors[name]="Enter a valid Price"
      }else{
        delete errors[name]
      }
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  return (
    <div className="proAdd">
      <h2 className="title">Edit Product</h2>
      Category :
      <input
        type="text"
        className="input"
        name="category"
        value={editedData.category}
        onChange={handleInputChange}
      />
      <span className="error-message" >{formErrors.category}</span>
      <br />
      Name of the product :
      <input
        type="text"
        className="input"
        name="name"
        value={editedData.name}
        onChange={handleInputChange}
      />
      <span className="error-message">{formErrors.name}</span>
      <br />
      Price :
      <input
        type="text"
        className="input"
        name="price"
        value={editedData.price}
        onChange={handleInputChange}
      />
      <span className="error-message">{formErrors.price}</span>
      <br />
      Image URL :
      <input
        type="text"
        className="input"
        name="image"
        value={editedData.image}
        onChange={handleInputChange}
      />
      <span className="error-message">{formErrors.image}</span>
      <button
        type="submit"
        className="btn3"
        onClick={handleSave}
        style={{ color: "white" }}
      >
        Save
      </button>
    </div>
  );
};

export default Edit;
