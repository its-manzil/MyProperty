import React, { useState } from "react";
import "./officenotify.css";
import OfficeNav from "./OfficeNav";

const OfficeNotify = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({});

  const viewDetails = (details) => {
    setCurrentDetails(details);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const data = [
    {
      buyerName: "John Doe",
      buyerContact: "123-456-7890",
      sellerName: "Jane Smith",
      sellerContact: "987-654-3210",
      landType: "Residential",
      landArea: "2000 sq ft",
      price: "$250,000",
    },
  ];

  return (
    <>
      <OfficeNav />
      <div className="table-container">
        <h2>Transaction Details</h2>
        <table>
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Seller Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.buyerName}</td>
                <td>{item.sellerName}</td>
                <td>
                  <button
                    className="btn-view"
                    onClick={() => viewDetails(item)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalVisible && (
          <div
            className="modal"
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
            tabIndex="0"
          >
            <div className="modal-content">
              <div className="section">
                <h3>Buyer Details</h3>
                <p>
                  <strong>Name:</strong> {currentDetails.buyerName}
                </p>
                <p>
                  <strong>Contact:</strong> {currentDetails.buyerContact}
                </p>
                <p>
                  <strong>Land Type:</strong> {currentDetails.landType}
                </p>
                <p>
                  <strong>Land Area:</strong> {currentDetails.landArea}
                </p>
              </div>
              <div className="section">
                <h3>Seller Details</h3>
                <p>
                  <strong>Name:</strong> {currentDetails.sellerName}
                </p>
                <p>
                  <strong>Contact:</strong> {currentDetails.sellerContact}
                </p>
              </div>
              <div className="modal-actions">
                <button className="btn-accept" onClick={closeModal}>
                  Accept
                </button>
                <button className="btn-reject" onClick={closeModal}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OfficeNotify;
