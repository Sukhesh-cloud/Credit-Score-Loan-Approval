const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/apply', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { amount, rate, duration, emi } = req.body;

    await db.query(
      'INSERT INTO loan_applications (user_id, requested_amount, interest_rate, duration_months, emi) VALUES (?, ?, ?, ?, ?)',
      [userId, amount, rate, duration, emi]
    );

    res.json({ message: 'Loan application submitted!' });
  } catch (err) {
    console.error("Loan apply error:", err);
    res.status(500).json({ error: 'Loan application failed' });
  }
});
router.get('/my-applications', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const [rows] = await db.query(
        'SELECT requested_amount, interest_rate, duration_months, emi, status, created_at FROM loan_applications WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
  
      res.json(rows);
    } catch (err) {
      console.error('Loan history error:', err);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });
  router.get('/all-applications', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const userRole = decoded.role;
  
      if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admins only' });
      }
  
      const [rows] = await db.query(
        `SELECT la.id, u.name, u.email, la.requested_amount, la.interest_rate, la.emi, la.duration_months, la.status, la.created_at
         FROM loan_applications la
         JOIN users u ON la.user_id = u.id
         ORDER BY la.created_at DESC`
      );
  
      res.json(rows);
    } catch (err) {
      console.error('Admin app fetch error:', err);
      res.status(500).json({ error: 'Failed to fetch all applications' });
    }
  });

  router.post('/update-status', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      const { id, status } = req.body;
  
      await db.query('UPDATE loan_applications SET status = ? WHERE id = ?', [status, id]);
  
      res.json({ message: `Application ${status}` });
    } catch (err) {
      console.error('Status update error:', err);
      res.status(500).json({ error: 'Status update failed' });
    }
  });
  

module.exports = router;
