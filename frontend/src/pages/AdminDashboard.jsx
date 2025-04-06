import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
const AdminDashboard = () => {
  const [apps, setApps] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/loan/all-applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("Fetched applications:", res.data); // 👈 Add this
      setApps(res.data);
    } catch (err) {
      console.error("Error fetching apps:", err);
    }
  };
  

  const updateStatus = async (id, status) => {
    try {
      await axios.post('http://localhost:5000/api/loan/update-status', { id, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchAll(); // refresh after update
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="admin-container">
      <h2>🔐 Admin: All Loan Applications</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Rate</th>
            <th>EMI</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>₹{a.requested_amount}</td>
              <td>{(a.interest_rate * 100).toFixed(1)}%</td>
              <td>₹{a.emi}</td>
              <td>{a.duration_months} mo</td>
              <td>{a.status}</td>
              <td>{new Date(a.created_at).toLocaleString()}</td>
              <td>
                {a.status === 'Pending' ? (
                    <>
                    <button onClick={() => updateStatus(a.id, 'Approved')}>✔️</button>
                    <button onClick={() => updateStatus(a.id, 'Rejected')}>❌</button>
                    </>
                ) : (
                <span style={{ color: a.status === 'Approved' ? 'green' : 'red' }}>
                {a.status}
                </span>

                )}
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
