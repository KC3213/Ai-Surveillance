// import React, { useEffect } from "react";
// import "./Dashboard.css";
// import Alerts from "./Alerts";

// const Dashboard = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0); // Ensure starts at top
//   }, []);

//   return (
//     <div className="dashboard-content">
//       <header className="dashboard-header">
//         <div>
//           <h1 className="title">HAWKEYE</h1>
//           <p className="subtitle">
//             AI-Powered Surveillance System with Anomaly Detection and 5G Streaming
//           </p>
//         </div>
//         <div className="top-right">
//           <input type="text" placeholder="Search..." className="search-input" />
//           <button
//             className="logout-btn"
//             onClick={() => {
//               localStorage.removeItem("isAuthenticated");
//               window.location.reload(); // simple force logout
//             }}
//           >
//             Log out
//           </button>
//         </div>
//       </header>

//       <h2 className="section-title">DASHBOARD</h2>
//       <div className="camera-grid">
//         <div className="camera-placeholder"></div>
//         <div className="camera-placeholder"></div>
//         <div className="camera-placeholder"></div>
//       </div>

//       <h2 className="section-title">ALERTS</h2>
//       <Alerts />
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect } from "react";
import "./Dashboard.css";
import Alerts from "./Alerts";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div>
          <h1 className="title">HAWKEYE</h1>
          <p className="subtitle">
            AI-Powered Surveillance System with Anomaly Detection and 5G Streaming
          </p>
        </div>
        <div className="top-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.reload();
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <h2 className="section-title">DASHBOARD</h2>
      <div className="camera-grid">
        <div className="camera-placeholder"></div>
        <div className="camera-placeholder"></div>
        <div className="camera-placeholder"></div>
      </div>

      <h2 className="section-title">ALERTS</h2>
      <Alerts />
    </div>
  );
};

export default Dashboard;




