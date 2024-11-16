import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./userdocument.css";

const UserDocument = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const profileData = {
    landLocation: "Kathmandu, Nepal",
    landArea: "500 sq.ft.",
    landType: "Residential",
  };

  useEffect(() => {
    const detailsContainer = document.querySelector(".details-container-bold");
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <h3>Land Location: ${profileData.landLocation}</h3>
        <h3>Land Area: ${profileData.landArea}</h3>
        <h3>Land Type: ${profileData.landType}</h3>
      `;
    }
  }, []);

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    e.target.reset();
  };

  const handleCancel = () => {
    setCurrentSection("home");
  };

  return (
    <>
    <Navbar />
    <div className="app-container">
      <button
        className="unique-buy-button"
        onClick={() => handleSectionChange("buy")}
      >
        Buy
      </button>
      {currentSection === "home" && (
        <div className="unique-centered-div">
          <div className="details-container details-container-bold">
            <h3>Loading profile...</h3>
          </div>
          <div className="unique-button-container">
            <button
              className="unique-sell-button"
              onClick={() => handleSectionChange("buy")}
            >
              Sell
            </button>
          </div>
        </div>
      )}
      {currentSection === "buy" && (
        <div className="unique-buy-section">
          <fieldset className="unique-fieldset">
            <legend>Transfer Property</legend>
            <form id="transferForm" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  id="currentOwner"
                  name="currentOwner"
                  required
                  pattern="[A-Za-z\\s]+"
                  placeholder="Current Owner"
                />
              </div>
              <div className="form-row">
                
                <input
                  type="text"
                  id="citznno"
                  name="citznno"
                  required
                  pattern="\\d+"
                  title="Only numbers allowed"
                  placeholder="Owner Citizenship no"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="currentAddress"
                  name="currentAddress"
                  required
                  pattern="[A-Za-z\\s]+"
                  placeholder="Address:"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="newOwner"
                  name="newOwner"
                  required
                  pattern="[A-Za-z\\s]+"
                  placeholder="Buyer Name"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="newCitznno"
                  name="newCitznno"
                  required
                  pattern="\\d+"
                  title="Only numbers allowed"
                  placeholder="Buyer Citizenship no"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="newAddress"
                  name="newAddress"
                  required
                  pattern="[A-Za-z\\s]+"
                  placeholder="Address:"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="landno"
                  name="landno"
                  required
                  pattern="\\d+"
                  title="Only numbers allowed"
                  placeholder="Land no"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="landarea"
                  name="landarea"
                  required
                  pattern="\\d+"
                  title="Only numbers allowed"
                  placeholder="Land Area"
                />
              </div>
              <div className="form-row">
                
                <input
                  type="text"
                  id="taxclearance"
                  name="taxclearance"
                  required
                  pattern="\\d+"
                  title="Only numbers allowed"
                  placeholder="Tax Clearance Invoice Number"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  pattern="[A-Za-z\\s]+"
                  placeholder="Land Location"
                />
              </div>
              <div className="unique-image-container">
                <img
                  src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg"
                  alt="Property Image"
                />
              </div>
              <div className="form-buttons">
                <button type="submit">Transfer</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </div>
    </>
  );
};

export default UserDocument;
