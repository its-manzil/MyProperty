import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./userdocument.css";

const UserDocument = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [buyerData, setBuyerData] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [token] = useState(localStorage.getItem("token")); // Assuming token is stored in localStorage

  useEffect(() => {
    // Fetch user properties
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8080/userProperties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserProperties(data);
        } else {
          console.error("Failed to fetch properties");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setBuyerData(data);
    setTransactionStatus("pending");

    try {
      const response = await fetch("http://localhost:8080/transferProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setTransactionStatus("completed");
        setUserProperties(result.updatedProperties); // Update the property list
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        setTransactionStatus("failed");
      }
    } catch (error) {
      console.error("Error during property transfer:", error);
      setTransactionStatus("failed");
    }
  };

  return (
    <>
      <Navbar />
      <button
        className="unique-buy-button"
        style={{ fontSize: "18px", marginTop: "-70px" }}
        onClick={() => setCurrentSection("buy")}
      >
        Buy Property
      </button>
      <div className="app-container">
        {currentSection === "home" && (
          <div className="unique-centered-div">
            <div className="property-grid">
              {userProperties.map((property) => (
                <div key={property.land_number} className="property-card">
                  <h3>Land Number: {property.land_number}</h3>
                  <p>Location: {property.land_location}</p>
                  <p>Area: {property.land_area} Sqft</p>
                  <p>Type: {property.land_type}</p>
                </div>
              ))}
            </div>
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
                  <button type="button" onClick={() => setCurrentSection("home")}>
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
