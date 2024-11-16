import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import LandRegistryABI from "./LandRegistryABI.json";
import axios from "axios";
import "./userdocument.css"; 

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function UserDocument() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ ownerName: "", citizenshipNo: "" });
  const [landRecords, setLandRecords] = useState([]);
  const [contract, setContract] = useState(null);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [formData, setFormData] = useState({ buyerName: "", buyerCitizenship: "", landNumber: "", price: "" });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
  }, [navigate]);

  // Initialize contract and fetch user data
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const providerInstance = new BrowserProvider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []);
        const signer = await providerInstance.getSigner();
        const contractInstance = new Contract(contractAddress, LandRegistryABI, signer);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask to use this feature!");
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user-details");
        const { ownerName, citizenshipNo } = response.data;
        setUserData({ ownerName, citizenshipNo });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    initContract().then(fetchUserData);
  }, []);

  // Fetch land records
  useEffect(() => {
    if (contract && userData.ownerName && userData.citizenshipNo) {
      fetchLandRecords();
    }
  }, [contract, userData]);

  const fetchLandRecords = async () => {
    try {
      const records = await contract.getLandRecordsByOwner(userData.ownerName, userData.citizenshipNo);
      setLandRecords(records);
    } catch (error) {
      console.error("Error fetching land records:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle buy action
  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      await contract.buyLand(formData.buyerName, formData.buyerCitizenship, formData.landNumber, formData.price);
      alert("Land bought successfully!");
      setShowBuyForm(false);
      fetchLandRecords();
    } catch (error) {
      console.error("Error buying land:", error);
    }
  };

  // Handle sell action
  const handleSell = async (e) => {
    e.preventDefault();
    try {
      await contract.sellLand(formData.landNumber, formData.price);
      alert("Land sold successfully!");
      setShowSellForm(false);
      fetchLandRecords();
    } catch (error) {
      console.error("Error selling land:", error);
    }
  };

  return (
    <div className="container">
      <div className="centered-div">
        <div className="details-container">
          <h2>Land Records for {userData.ownerName}</h2>
          {landRecords.length > 0 ? (
            landRecords.map((record, index) => (
              <div key={index}>
                <p>Land Number: {record.landNumber}</p>
                <p>Landmark: {record.landmark}</p>
                <p>Area: {record.area}</p>
                <p>Type: {record.landType}</p>
              </div>
            ))
          ) : (
            <p>No land records found.</p>
          )}
        </div>

        <div className="button-container">
          <button onClick={() => setShowBuyForm(!showBuyForm)}>Buy</button>
          <button onClick={() => setShowSellForm(!showSellForm)}>Sell</button>
        </div>

        {showBuyForm && (
          <form className="form" onSubmit={handleBuy}>
            <input
              type="text"
              name="buyerName"
              placeholder="Buyer Name"
              value={formData.buyerName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="buyerCitizenship"
              placeholder="Buyer Citizenship No"
              value={formData.buyerCitizenship}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="landNumber"
              placeholder="Land Number"
              value={formData.landNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-button">Confirm Buy</button>
          </form>
        )}

        {showSellForm && (
          <form className="form" onSubmit={handleSell}>
            <input
              type="text"
              name="landNumber"
              placeholder="Land Number"
              value={formData.landNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-button">Confirm Sell</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserDocument;
