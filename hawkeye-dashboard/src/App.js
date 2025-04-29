import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";
import Login from "./pages/LoginForm";
import { authService } from "./services/api";

// Lazy load components
const Users = React.lazy(() => import('./components/Users'));
const Chart = React.lazy(() => import('./components/Chart'));
const Cameras = React.lazy(() => import('./components/Cameras'));
const Calendar = React.lazy(() => import('./components/Calendar'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Test backend connection on app start
    const testConnection = async () => {
      const connected = await authService.testConnection();
      setBackendConnected(connected);
      if (!connected) {
        console.error('Backend connection failed. Please make sure the server is running.');
      }
    };
    testConnection();
  }, []);

  const handleAuthChange = useCallback((value) => {
    setIsAuthenticated(value);
    localStorage.setItem("isAuthenticated", value);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {!backendConnected && (
          <div className="connection-error">
            Warning: Backend server is not connected. Please make sure the server is running.
          </div>
        )}
        {isAuthenticated && (
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={toggleSidebar} 
          />
        )}
        <div
          className={`main-content ${isAuthenticated ? "authenticated" : ""}`}
          style={{
            marginLeft: isAuthenticated ? (sidebarOpen ? "250px" : "80px") : "0",
            transition: "margin-left 0.3s ease"
          }}
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Login setIsAuthenticated={handleAuthChange} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard sidebarOpen={sidebarOpen} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/alerts"
                element={
                  isAuthenticated ? <Alerts /> : <Navigate to="/" />
                }
              />
              <Route
                path="/users"
                element={
                  isAuthenticated ? <Users /> : <Navigate to="/" />
                }
              />
              <Route
                path="/chart"
                element={
                  isAuthenticated ? <Chart /> : <Navigate to="/" />
                }
              />
              <Route
                path="/cameras"
                element={
                  isAuthenticated ? <Cameras /> : <Navigate to="/" />
                }
              />
              <Route
                path="/calendar"
                element={
                  isAuthenticated ? <Calendar /> : <Navigate to="/" />
                }
              />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;


