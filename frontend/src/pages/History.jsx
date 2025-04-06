import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRecords(response.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;

  return (
    <div className="history-container">
      <h2>📜 My Prediction History</h2>
      {records.length === 0 ? (
        <p>No records yet. Predict your score to see history.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Income</th>
              <th>History Score</th>
              <th>Utility Bills</th>
              <th>Predicted Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.income}</td>
                <td>{r.history_score}</td>
                <td>{r.utility_bills_paid}</td>
                <td>{r.predicted_score.toFixed(2)}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
