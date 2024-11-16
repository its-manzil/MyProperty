import React, { useState } from "react";
import "./officenotify.css";
import OfficeNav from "./OfficeNav";

const OfficeNotify = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (rowData) => {
    setModalData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const transactions = [
    {
      buyer: "John Doe",
      buyerContact: "123-456-7890",
      seller: "Jane Smith",
      sellerContact: "987-654-3210",
      landType: "Residential",
      landArea: "2000 sq ft",
      price: "$250,000",
    },
    {
      buyer: "Alice Johnson",
      buyerContact: "234-567-8901",
      seller: "Bob Brown",
      sellerContact: "876-543-2109",
      landType: "Commercial",
      landArea: "1500 sq ft",
      price: "$300,000",
    },
  ];

  return (<>
    <OfficeNav />
    <div className="container">
      <h2>Transaction Details</h2>
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div className="transaction-item" key={index}>
            <p>
              <strong>Buyer:</strong> {transaction.buyer}
            </p>
            <p>
              <strong>Seller:</strong> {transaction.seller}
            </p>
            <button
              className="btn-view"
              onClick={() => handleViewDetails(transaction)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && modalData && (
        <div className="modal">
          <div className="modal-content">
            {/* Buyer Section */}
            <div className="section">
              <h3>Buyer Details</h3>
              <p>
                <strong>Name:</strong> {modalData.buyer}
              </p>
              <p>
                <strong>Contact:</strong> {modalData.buyerContact}
              </p>
              <p>
                <strong>Land Type:</strong> {modalData.landType}
              </p>
              <p>
                <strong>Land Area:</strong> {modalData.landArea}
              </p>
            </div>

            {/* Seller Section */}
            <div className="section">
              <h3>Seller Details</h3>
              <p>
                <strong>Name:</strong> {modalData.seller}
              </p>
              <p>
                <strong>Contact:</strong> {modalData.sellerContact}
              </p>
            </div>

            <button className="btn-accept" onClick={handleCloseModal}>
              Accept
            </button>
            <button className="btn-reject" onClick={handleCloseModal}>
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default OfficeNotify;
