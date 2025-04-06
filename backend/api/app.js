// backend/api/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/users', require('./routes/users'));
app.use('/api/credit', require('./routes/creditScore'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const authRoutes = require('./routes/auth');
const creditRoutes = require('./routes/creditScore');
const historyRoutes = require('./routes/history');
const loanRoutes = require('./routes/loan');



app.use('/api/loan', loanRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/history', historyRoutes);