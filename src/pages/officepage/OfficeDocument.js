import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LandRegistryABI from "./LandRegistryABI.json"; // The ABI JSON file
import "./officedocument.css";

function OfficeDocument() {
  const [form, setForm] = useState({
    landNumber: "",
    landmark: "",
    area: "",
    landType: "",
    ownerName: "",
    citizenshipNo: ""
  });

  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAddress = "";

  useEffect(() => {
    if (window.ethereum) {
      const initEthers = async () => {
        const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []);
        setProvider(providerInstance);

        const signer = providerInstance.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, LandRegistryABI, signer);
        setContract(contractInstance);
      };
      initEthers();
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Contract is not loaded.");

    const { landNumber, landmark, area, landType, ownerName, citizenshipNo } = form;
    try {
      const tx = await contract.createLandRecord(landNumber, landmark, area, landType, ownerName, citizenshipNo);
      await tx.wait();
      alert("Land record added successfully!");
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Failed to add record.");
    }
  };

  return (
    <div>
      <button className="add-button" onClick={() => window.ethereum.enable()}>
        Connect Wallet
      </button>
      <div className="form-container">
        <h2>Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="landNumber"
              placeholder="Land Number"
              value={form.landNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={form.landmark}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="area"
              placeholder="Area"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="landType">Land Type:</label>
            <select id="landType" name="landType" value={form.landType} onChange={handleChange} required>
              <option value="" disabled>Select Land Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="agricultural">Agricultural</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="ownerName"
              placeholder="Land owner name"
              value={form.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="citizenshipNo"
              placeholder="Citizenship No."
              value={form.citizenshipNo}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default OfficeDocument;
