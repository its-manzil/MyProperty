// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
// import UserLogin from "./pages/userpage/UserLogin";
// import UserDashboard from "./pages/userpage/UserDashboard";
// import UserDocuments from "./pages/userpage/UserDocuments";
import Admin from "./pages/adminpage/Admin";
// import AdminLogin from "./pages/adminpage/AdminLogin";
// import UserServices from "./pages/userpage/UserServices";
// import UserNotifications from "./pages/userpage/UserNotifications";
// import UserHome from "./pages/userpage/UserHome";
import OfficeDocument from "./pages/officepage/OfficeDocument";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <Router>
      <App />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/UserLogin" element={<UserLogin />} /> */}
        {/* <Route path="/UserDashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/UserDocuments" element={<UserDocuments />} /> */}
        <Route path="/Admin" element={<Admin />} />
        {/* <Route path="/AdminLogin" element={<AdminLogin />} /> */}
        {/* <Route path="/UserServices" element={<UserServices />} /> */}
        {/* <Route path="/UserNotifications" element={<UserNotifications />} /> */}
        {/* <Route path="/UserHome" element={<UserHome />} /> */}
        <Route path="/OfficeDocument" element={<OfficeDocument />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();