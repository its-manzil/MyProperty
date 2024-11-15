import React, { useState } from "react";
import Navbar from "./Navbar";
import "./userdocument.css";

const UserDocument = () => {
  const [formValues, setFormValues] = useState({
    
    newOwner: "",
    newCitznno: "",
    newAddress: "",
    landno: "",
    landarea: "",
    taxclearance: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll("input");

    for (let input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }

    console.log("Form Submitted Successfully", formValues);
    setFormValues({
      
      newOwner: "",
      newCitznno: "",
      newAddress: "",
      landno: "",
      landarea: "",
      taxclearance: "",
      location: "",
    });
  };

  return (
    <>
    <Navbar />
    <div className="form-container">
      <fieldset>
        <legend>Transfer Property</legend>
        <form onSubmit={handleSubmit}>
          

          <label htmlFor="newOwner">Buyer Name:</label>
          <input
            type="text"
            id="newOwner"
            name="newOwner"
            value={formValues.newOwner}
            onChange={handleChange}
            required
            pattern="[A-Za-z\s]+"
          />

          <label htmlFor="newCitznno">Buyer Citizenship no:</label>
          <input
            type="text"
            id="newCitznno"
            name="newCitznno"
            value={formValues.newCitznno}
            onChange={handleChange}
            required
            pattern="\d+"
            title="Only numbers allowed"
          />

          <label htmlFor="newAddress">Address:</label>
          <input
            type="text"
            id="newAddress"
            name="newAddress"
            value={formValues.newAddress}
            onChange={handleChange}
            required
            pattern="[A-Za-z\s]+"
          />

          <label htmlFor="landno">Land no:</label>
          <input
            type="text"
            id="landno"
            name="landno"
            value={formValues.landno}
            onChange={handleChange}
            required
            pattern="\d+"
            title="Only numbers allowed"
          />

          <label htmlFor="landarea">Land Area:</label>
          <input
            type="text"
            id="landarea"
            name="landarea"
            value={formValues.landarea}
            onChange={handleChange}
            required
            pattern="\d+"
            title="Only numbers allowed"
          />

          <label htmlFor="taxclearance">Tax Clearance Invoice Number:</label>
          <input
            type="text"
            id="taxclearance"
            name="taxclearance"
            value={formValues.taxclearance}
            onChange={handleChange}
            required
            pattern="\d+"
            title="Only numbers allowed"
          />

          <label htmlFor="location">Land Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            required
            pattern="[A-Za-z\s]+"
          />

          <div className="image-container">
            <img
              src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg"
              alt="Property"
            />
          </div>

          <button type="submit">Transfer</button>
        </form>
      </fieldset>
    </div>
    </>
  );
};

export default UserDocument;