import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import LandRegistryABI from "./LandRegistryABI.json";
import axios from "axios";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function UserDocument() {
  const [userData, setUserData] = useState({ ownerName: "", citizenshipNo: "" });
  const [landRecords, setLandRecords] = useState([]);
  const [contract, setContract] = useState(null);

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
    </div>
  );
}

export default UserDocument;
