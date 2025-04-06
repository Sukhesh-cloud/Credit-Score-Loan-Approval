import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/loan/my-applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setApps(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="history-container">
      <h2>📑 My Loan Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : apps.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Rate</th>
              <th>EMI</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a, i) => (
              <tr key={i}>
                <td>₹{a.requested_amount}</td>
                <td>{(a.interest_rate * 100).toFixed(1)}%</td>
                <td>₹{a.emi}</td>
                <td>{a.duration_months} mo</td>
                <td>{a.status}</td>
                <td>{new Date(a.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyApplications;
