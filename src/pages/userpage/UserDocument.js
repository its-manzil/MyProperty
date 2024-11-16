import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./userdocument.css";
import { BrowserProvider, Contract } from "ethers";

const UserDocument = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [transactionStatus, setTransactionStatus] = useState("pending"); // Track transaction status
  const [buyerData, setBuyerData] = useState(null);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Save the buyer's data to display it later
    setBuyerData(data);
    setTransactionStatus("pending");

    // Connect to blockchain (assuming a smart contract for land transfer is deployed)
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      

      const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      const abi = [
        {
          "inputs": [
            { "internalType": "address", "name": "currentOwner", "type": "address" },
            { "internalType": "address", "name": "newOwner", "type": "address" },
            { "internalType": "uint256", "name": "landNo", "type": "uint256" },
            { "internalType": "uint256", "name": "landArea", "type": "uint256" },
            { "internalType": "uint256", "name": "taxClearanceInvoice", "type": "uint256" },
            { "internalType": "string", "name": "location", "type": "string" }
          ],
          "name": "transferProperty",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      
      const contract = new Contract(contractAddress, abi, signer);
      
      try {
        // Example function call to transfer property
        const tx = await contract.transferProperty(
          data.currentOwner,
          data.newOwner,
          data.landno,
          data.landarea,
          data.taxclearance,
          data.location
        );
        await tx.wait();

        alert("Property transfer submitted successfully!");
        setTransactionStatus("submitted");

        // Reset form
        e.target.reset();
      } catch (error) {
        console.error("Blockchain transaction failed:", error);
        alert("Transaction failed. Please try again.");
      }
    } else {
      alert("Ethereum wallet not found. Please install MetaMask.");
    }
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
            <button
              className="unique-buy-button"
              style={{ fontSize: "18px", marginTop: "20px" }}
              onClick={() => setCurrentSection("buy")}
            >
              Buy New Property
            </button>
          </div>
        )}
        {currentSection === "buy" && (
          <div className="unique-buy-section">
            <fieldset className="unique-fieldset">
              <legend>Transfer Property</legend>
              <form id="transferForm" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <input type="text" name="currentOwner" required placeholder="Current Owner" />
                </div>
                <div className="form-row">
                  <input type="text" name="citznno" required placeholder="Owner Citizenship no" />
                </div>
                <div className="form-row">
                  <input type="text" name="currentAddress" required placeholder="Address:" />
                </div>
                <div className="form-row">
                  <input type="text" name="newOwner" required placeholder="Buyer Name" />
                </div>
                <div className="form-row">
                  <input type="text" name="newCitznno" required placeholder="Buyer Citizenship no" />
                </div>
                <div className="form-row">
                  <input type="text" name="newAddress" required placeholder="Address:" />
                </div>
                <div className="form-row">
                  <input type="text" name="landno" required placeholder="Land no" />
                </div>
                <div className="form-row">
                  <input type="text" name="landarea" required placeholder="Land Area" />
                </div>
                <div className="form-row">
                  <input type="text" name="taxclearance" required placeholder="Tax Clearance Invoice Number" />
                </div>
                <div className="form-row">
                  <input type="text" name="location" required placeholder="Land Location" />
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
