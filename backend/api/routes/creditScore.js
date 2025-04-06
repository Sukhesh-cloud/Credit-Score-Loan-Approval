const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/evaluate', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const modelResponse = await axios.post('http://127.0.0.1:8000/predict', req.body);
    const { credit_score, shap_values } = modelResponse.data;

    const { income, history_score, utility_bills_paid } = req.body;
    console.log("Saving prediction for user:", userId);
console.log("Prediction data:", {
  income,
  history_score,
  utility_bills_paid,
  credit_score,
  shap_values,
});
try {
  const [result] = await db.query(
    'INSERT INTO predictions (user_id, income, history_score, utility_bills_paid, predicted_score, shap_income, shap_history, shap_bills) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      userId,
      income,
      history_score,
      utility_bills_paid,
      credit_score,
      shap_values[0],
      shap_values[1],
      shap_values[2],
    ]
  );
  console.log("Prediction saved. Insert ID:", result.insertId);
} catch (sqlErr) {
  console.error("❌ DB INSERT ERROR:", sqlErr);
}


    res.json(modelResponse.data);
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ error: 'Model not responding or unauthorized' });
  }
});
module.exports = router;
