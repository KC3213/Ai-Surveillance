import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../services/api';
import './Alerts.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    recipient: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
    fetchStats();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await api.get('/api/alerts/history');
      setAlerts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch alert history');
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/alerts/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch alert statistics:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    
    try {
      const response = await api.post('/api/alerts/send', formData);
      if (response.data && response.data.message === 'Alert sent successfully') {
        setShowModal(false);
        setFormData({ message: '', recipient: '' });
        await fetchAlerts();
        await fetchStats();
      } else {
        setError('Failed to send alert: Invalid response from server');
      }
    } catch (err) {
      console.error('Alert sending error:', err);
      const errorMessage = err.response?.data?.error || 'Failed to send alert';
      const errorDetails = err.response?.data?.details || 'No additional details available';
      setError(`${errorMessage}. Details: ${errorDetails}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="alerts-container">
        <h1>Alerts</h1>
        <p>Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h1>Alerts</h1>
        <button 
          className="send-alert-btn"
          onClick={() => setShowModal(true)}
        >
          Send Alert
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
          <button 
            className="clear-error-btn"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="alerts-stats">
        <h2>Alert Statistics (Last 7 Days)</h2>
        <BarChart
          width={800}
          height={300}
          data={stats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ffcc00" />
        </BarChart>
      </div>

      <div className="alerts-history">
        <h2>Recent Alerts</h2>
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Recipient</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert._id}>
                <td>{formatDate(alert.timestamp)}</td>
                <td>{alert.recipient}</td>
                <td>{alert.message}</td>
                <td className={`status-${alert.status}`}>
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Send Alert</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Recipient Email</label>
                <input
                  type="email"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="send-btn">Send</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
