import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import LandRegistryABI from "./LandRegistryABI.json";
import axios from "axios";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function UserDocument() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ ownerName: "", citizenshipNo: "" });
  const [landRecords, setLandRecords] = useState([]);
  const [contract, setContract] = useState(null);

  const [buyData, setBuyData] = useState({ landNumber: "", sellerAddress: "" });
  const [sellData, setSellData] = useState({ landNumber: "", buyerAddress: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
  }, [navigate]);

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

  // Buying land
  const handleBuyChange = (e) => {
    const { name, value } = e.target;
    setBuyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.buyLand(buyData.landNumber, buyData.sellerAddress);
      alert("Land purchase successful!");
      fetchLandRecords(); // Refresh records
    } catch (error) {
      console.error("Error buying land:", error);
    }
  };

  // Selling land
  const handleSellChange = (e) => {
    const { name, value } = e.target;
    setSellData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.sellLand(sellData.landNumber, sellData.buyerAddress);
      alert("Land sale successful!");
      fetchLandRecords(); // Refresh records
    } catch (error) {
      console.error("Error selling land:", error);
    }
  };

  return (
    <div>
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

      {/* Buy Land Form */}
      <h3>Buy Land</h3>
      <form onSubmit={handleBuySubmit}>
        <label>
          Land Number:
          <input
            type="text"
            name="landNumber"
            value={buyData.landNumber}
            onChange={handleBuyChange}
          />
        </label>
        <label>
          Seller Address:
          <input
            type="text"
            name="sellerAddress"
            value={buyData.sellerAddress}
            onChange={handleBuyChange}
          />
        </label>
        <button type="submit">Buy Land</button>
      </form>

      {/* Sell Land Form */}
      <h3>Sell Land</h3>
      <form onSubmit={handleSellSubmit}>
        <label>
          Land Number:
          <input
            type="text"
            name="landNumber"
            value={sellData.landNumber}
            onChange={handleSellChange}
          />
        </label>
        <label>
          Buyer Address:
          <input
            type="text"
            name="buyerAddress"
            value={sellData.buyerAddress}
            onChange={handleSellChange}
          />
        </label>
        <button type="submit">Sell Land</button>
      </form>
    </div>
  );
}

export default UserDocument;
