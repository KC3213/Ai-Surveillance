// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";
import { Home, Users, Clock, FileText, Calendar, Activity } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>
      <div className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
        {sidebarOpen && <span>Menu</span>}
      </div>
      {sidebarOpen && (
        <>
          <h2 className="sidebar-title">User</h2>
          <ul className="sidebar-list">
            <li>
              <Link to="/dashboard">
                <Home size={16} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Users size={16} /> Add Users
              </Link>
            </li>
            <li>
              <Link to="/chart">
                <Clock size={16} /> User Chart
              </Link>
            </li>
            <li>
              <Link to="/cameras">
                <FileText size={16} /> Camera Directory
              </Link>
            </li>
            <li>
              <Link to="/calendar">
                <Calendar size={16} /> Calendar
              </Link>
            </li>
            <li>
              <Link to="/alerts">
                <Activity size={16} /> Alerts
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;


// import React from "react";
// import "./Sidebar.css";
// import { FaBars } from "react-icons/fa";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   return (
//     <div
//       className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}
//     >
//       <div className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         <FaBars />
//         {sidebarOpen && <span style={{ marginLeft: "10px" }}>Menu</span>}
//       </div>
//       {sidebarOpen && (
//         <>
//           <h2>User</h2>
//           <ul>
//             <li>Dashboard</li>
//             <li>Add Users</li>
//             <li>User Chart</li>
//             <li>Camera Directory</li>
//             <li>Calendar</li>
//             <li>Alerts</li>
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


