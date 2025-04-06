import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import History from './pages/History';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './pages/Chatbot';

function App() {
  const [, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/credit" element={<Home />} />
        <Route path="/" element={<LoginWrapper setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterWrapper />} />
        <Route path="/history" element={<History />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
      <Chatbot />
    </Router>
  );
}

// ✅ Correct way to use hooks
const LoginWrapper = ({ setAuth }) => {
  const navigate = useNavigate();
  return <Login setAuth={setAuth} navigate={navigate} />;
};

const RegisterWrapper = () => {
  const navigate = useNavigate();
  return <Register navigate={navigate} />;
};


export default App;
