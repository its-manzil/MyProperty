import React from "react";
import "./officedocument.css";

function OfficeDocument() {
  return (
    <div>
      <button className="add-button">Add Document</button>

      <div className="form-container">
        <h2>Document</h2>
        <div className="form-group">
          <input type="text" placeholder="Land no" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Landmark" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Area" required />
        </div>
        <div className="form-group">
          <label htmlFor="landtype">Landtype:</label>
          <select id="landtype" required>
            <option value="" disabled selected>
              Select Landtype
            </option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="land">Agricultural</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Land owner name" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Citizenship.no" required />
        </div>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default OfficeDocument;
