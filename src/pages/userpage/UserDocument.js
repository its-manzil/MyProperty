import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./userdocument.css";
 
const UserDocument = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [buyerData, setBuyerData] = useState(null);
 
  const profileData = {
    landLocation: "",
    landType: "",
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
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
 
    // Save the buyer's data to display it later
    setBuyerData(data);
    setTransactionStatus("pending");
 
    // Blockchain logic for property transfer can be added here
    // Assuming we have a connected contract and Ethereum wallet
 
    setTransactionStatus("submitted");
    alert("Property transfer submitted successfully!");
  };
 
  return (
    <>
      <Navbar />
      <div className="app-container">
        {currentSection === "home" && (
          <div className="unique-centered-div">
            <div className="details-container details-container-bold">
              <h3>Land Location: {profileData.landLocation}</h3>
              <h3>Land Area: {profileData.landArea}</h3>
              <h3>Land Type: {profileData.landType}</h3>
            </div>
            <button class="form-button"
              className="unique-buy-button"
              style={{ fontSize: "18px", marginTop: "-70px" }}
              onClick={() => setCurrentSection("buy")}
            >
              Buy Property
            </button>
          </div>
        )}
 
        {currentSection === "buy" && (
          <div className="unique-buy-section">
            <fieldset className="unique-fieldset">
              <legend>Transfer Property</legend>
              <form id="transferForm" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="half-form">
                    <input type="text" name="currentOwner" required placeholder="Current Owner" />
                    <input type="text" name="citznno" required placeholder="Owner Citizenship no" />
                    <input type="text" name="currentAddress" required placeholder="Address:" />
                  </div>
                  <div className="half-form">
                    <input type="text" name="newOwner" required placeholder="Buyer Name" />
                    <input type="text" name="newCitznno" required placeholder="Buyer Citizenship no" />
                    <input type="text" name="newAddress" required placeholder="Address:" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="half-form">
                    <input type="text" name="landno" required placeholder="Land no" />
                    <input type="text" name="landarea" required placeholder="Land Area" />
                  </div>
                  <div className="half-form">
                    <input type="text" name="taxclearance" required placeholder="Tax Clearance Invoice Number" />
                    <input type="text" name="location" required placeholder="Land Location" />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="submit">Transfer</button>
                  <button type="button" onClick={() => setCurrentSection("home")}>Cancel</button>
                </div>
              </form>
            </fieldset>
            {transactionStatus === "pending" && buyerData && (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Land No</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{buyerData.landno}</td>
                    <td>{buyerData.location}</td>
                    <td>Pending Approval</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
};
 
export default UserDocument;