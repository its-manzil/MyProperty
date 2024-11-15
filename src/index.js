// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import UserLogin from "./pages/userpage/UserLogin";
import UserDashboard from "./pages/userpage/UserDashboard";
import UserDocument from "./pages/userpage/UserDocument";
import Admin from "./pages/adminpage/Admin";
import AdminLogin from "./pages/adminpage/AdminLogin";
// import UserServices from "./pages/userpage/UserServices";
import UserNotifications from "./pages/userpage/UserNotifications";
import UserHome from "./pages/userpage/UserHome";
import OfficeDocument from "./pages/officepage/OfficeDocument";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <Router>
      <App />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/UserDocument" element={<UserDocument />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        {/* <Route path="/UserServices" element={<UserServices />} /> */}
        <Route path="/UserNotifications" element={<UserNotifications />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/OfficeDocument" element={<OfficeDocument />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();