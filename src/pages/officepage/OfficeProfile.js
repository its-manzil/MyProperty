import React from "react";
import "./officeprofile.css";
import OfficeNav from "./OfficeNav";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

const OfficeProfile = () => {
  return (
    <>
      <OfficeNav />
      <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-pic">
          <i className="fas fa-user">
            <HiMiniBuildingOffice2 />
          </i>
        </div>

        {/* Name */}
        <div className="profile-name">Office Dashboard</div>

        {/* Profile Details Section */}
        <div className="profile-details">
          <span className="profile-detail">
            <i className="fas fa-id-card"></i> Office Name:
          </span>
          <span className="profile-detail">
            <i className="fas fa-envelope"></i> Office Email:
          </span>
          <span className="profile-detail">
            <i className="fas fa-phone"></i> Office Phone:
          </span>
          <span className="profile-detail">
            <i className="fas fa-map-marker-alt"></i> Office Address:
          </span>
          <span className="profile-detail">
            <i className="fas fa-id-badge"></i> Office Department:
          </span>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="logout-btn">Logout</button>
        </div>

        {/* App Version */}
        <div className="app-version">App version 2.0.30</div>
      </div>
    </>
  );
};

export default OfficeProfile;
