import './Chatbot.css';
import React, { useState, useEffect, useRef } from 'react';


const Chatbot = () => {
  const chatBodyRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    const message = userInput.trim();
    if (!message) return;

    setChatLog([...chatLog, { sender: 'user', text: message }]);
    setUserInput('');

    // Loan simulation
    if (message.toLowerCase().includes('loan')) {
      const { amount, rate, years } = extractLoanParams(message);
      if (amount && rate && years) {
        const emi = calculateEMI(amount, rate, years);
        addBotResponse(`For ₹${amount} at ${rate}% over ${years} years, your monthly EMI is ₹${emi}`);
        return;
      }
    }

    const reply = await fetchGeminiResponse(message);
    addBotResponse(reply);
  };

  const addBotResponse = (text) => {
    setChatLog((prev) => [...prev, { sender: 'bot', text }]);
  };

  const fetchGeminiResponse = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCT6iMANeqbeM_XFOn-SBEGwzmnERzwC48`;
  
    const body = {
      contents: [
        {
          parts: [{ text: prompt+'3 line answer' }]
        }
      ]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
  
      // Step 1: Safely extract text
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
  
      // Step 2: Refine the text
      text = text
        .replace(/\*\*/g, '')          // remove bold markdown (**text**)
        .replace(/`/g, '')             // remove backticks
        .replace(/\n{2,}/g, '\n')      // reduce multiple newlines to one
        .trim();
  
      return text;
    } catch (err) {
      console.error('Gemini API Error:', err);
      return 'Something went wrong while contacting Gemini.';
    }
  };
  
  

  const extractLoanParams = (msg) => {
    const nums = msg.match(/\d+(\.\d+)?/g)?.map(Number);
    const amount = nums?.[0], rate = nums?.[1], years = nums?.[2];
    return { amount, rate, years };
  };

  const calculateEMI = (p, r, t) => {
    const mRate = r / 12 / 100;
    const n = t * 12;
    const emi = (p * mRate * Math.pow(1 + mRate, n)) / (Math.pow(1 + mRate, n) - 1);
    return emi.toFixed(2);
  };
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div className="chatbot-assistant">
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">💬 Assistant</div>
          <div className="chat-body" ref={chatBodyRef}>
            {chatLog.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleUserInput}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about finance..."
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}

      <button className="chat-circle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' :'💬'}
      </button>
    </div>
  );
};

export default Chatbot;
