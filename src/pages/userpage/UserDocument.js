import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers"; 
import LandRegistryABI from "./LandRegistryABI.json";
import axios from "axios";

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 

function UserDocument() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
      return;
    }
  }, [navigate]);
  const [userData, setUserData] = useState({ ownerName: "", citizenshipNo: "" });
  const [landRecords, setLandRecords] = useState([]);
  const [contract, setContract] = useState(null);

  // Initialize contract and fetch user data
  let contractInstance;
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const providerInstance = new BrowserProvider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []);
        const signer = await providerInstance.getSigner();
       contractInstance = new Contract(contractAddress, LandRegistryABI, signer);
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

        if (contractInstance) {
          fetchLandRecords(contractInstance, ownerName, citizenshipNo);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    initContract().then(fetchUserData);
  }, []);

  const fetchLandRecords = async (contractInstance, ownerName, citizenshipNo) => {
    try {
      const records = await contractInstance.getLandRecordsByOwner(ownerName, citizenshipNo);
      setLandRecords(records);
    } catch (error) {
      console.error("Error fetching land records:", error);
    }
  };

  return (
    <div>
      <h2>Land Records for {userData.ownerName}</h2>
      {landRecords.map((record, index) => (
        <div key={index}>
          <p>Land Number: {record.landNumber}</p>
          <p>Landmark: {record.landmark}</p>
          <p>Area: {record.area}</p>
          <p>Type: {record.landType}</p>
        </div>
      ))}
    </div>
  );
}

export default UserDocument;
