import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import TransferABI from "./TransferABI.json";

const UserDocument = () => {
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, TransferABI, signer);

      try {
        const tx = await contract.registerLand(
          data.owner,
          data.citznno,
          data.ownerAddress,
          data.landno,
          data.landarea,
          data.taxclearance,
          data.location
        );
        await tx.wait();

        alert("Land data registered successfully!");
        setTransactionStatus("submitted");
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
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="owner" required placeholder="Owner" />
      <input type="text" name="citznno" required placeholder="Owner Citizenship no" />
      <input type="text" name="ownerAddress" required placeholder="Owner Address" />
      <input type="text" name="landno" required placeholder="Land Number" />
      <input type="text" name="landarea" required placeholder="Land Area" />
      <input type="text" name="taxclearance" required placeholder="Tax Clearance Invoice Number" />
      <input type="text" name="location" required placeholder="Land Location" />
      <button type="submit">Register Land</button>
    </form>
  );
};

export default UserDocument;
