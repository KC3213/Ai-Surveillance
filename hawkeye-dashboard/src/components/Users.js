import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Users.css';

const Users = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await api.get('/api/auth/active-users');
        setActiveUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch active users');
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1>Users Management</h1>
        <p>Loading active users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Users Management</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Users Management</h1>
      <div className="users-stats">
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-number">{activeUsers.length}</p>
        </div>
      </div>
      
      <div className="users-table-container">
        <h2>Active Users List</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Login Count</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user) => (
              <tr key={user.email}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>{user.loginCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users; 