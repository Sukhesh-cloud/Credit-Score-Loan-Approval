import React, { useState } from 'react';
import axios from 'axios';
import ScoreCard from '../components/ScoreCard';
import './Home.css';
import ShapChart from '../components/ShapChart';

const calculateEMI = (P, R, N) => {
  const monthlyRate = R / 12;
  const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1);
  return emi.toFixed(2);
};

const Home = () => {
  const [form, setForm] = useState({
    income: '',
    history_score: '',
    utility_bills_paid: ''
  });
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shapValues, setShapValues] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loanOffer, setLoanOffer] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScore(null);
    setShapValues([]);
    setFeatures([]);
    setLoanOffer(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/credit/evaluate',
        {
          income: Number(form.income),
          history_score: Number(form.history_score),
          utility_bills_paid: Number(form.utility_bills_paid),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const predictedScore = response.data.credit_score;
      setScore(predictedScore);
      setShapValues(response.data.shap_values);
      setFeatures(response.data.features);

      // Loan eligibility logic
      let offer = null;
      if (predictedScore >= 750) {
        offer = {
          eligible: true,
          amount: 1000000,
          rate: 0.08,
          duration: 60
        };
      } else if (predictedScore >= 650) {
        offer = {
          eligible: true,
          amount: 500000,
          rate: 0.12,
          duration: 36
        };
      } else {
        offer = { eligible: false };
      }
      setLoanOffer(offer);

    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const applyForLoan = async (offer) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/loan/apply',
        {
          amount: offer.amount,
          rate: offer.rate,
          duration: offer.duration,
          emi: calculateEMI(offer.amount, offer.rate, offer.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(response.data.message);
    } catch (err) {
      alert("Failed to apply for loan.");
      console.error(err);
    }
  };
  
  return (
    <div className="home-container">
      <h1>AI Credit Score Predictor</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="income" type="number" placeholder="Monthly Income" value={form.income} onChange={handleChange} required />
        <input name="history_score" type="number" placeholder="Credit History Score" value={form.history_score} onChange={handleChange} required />
        <input name="utility_bills_paid" type="number" placeholder="Utility Bills Paid (Last 12 Mo)" value={form.utility_bills_paid} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Predicting..." : "Predict Score"}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {score !== null && <ScoreCard score={score} />}
      {shapValues.length > 0 && features.length > 0 && (
        <ShapChart shapValues={shapValues} features={features} />
      )}

      {loanOffer && (
        <div className="loan-box">
          <h3>🏦 Loan Eligibility Result</h3>
          {loanOffer.eligible ? (
            <>
              <p>✅ You are eligible for a loan of ₹{(loanOffer.amount / 100000).toFixed(1)} Lakh</p>
              <p>📅 Duration: {loanOffer.duration} months</p>
              <p>💸 Interest Rate: {(loanOffer.rate * 100).toFixed(1)}%</p>
              <p>🧮 Estimated EMI: ₹{calculateEMI(loanOffer.amount, loanOffer.rate, loanOffer.duration)}</p>
              <button onClick={() => applyForLoan(loanOffer)}>Apply Now</button>
            </>
          ) : (
            <p>❌ You are currently not eligible for a loan.</p>
          )}
        </div>
      )}
      <a href="/my-applications" style={{ color: 'green', textDecoration: 'underline' }}>
  🧾 View My Applications
</a>


      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/history" style={{ color: 'blue', textDecoration: 'underline' }}>
          📜 View My Prediction History
        </a>
      </div>
    </div>
  );
};

export default Home;
