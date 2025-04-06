import React from 'react';

const ScoreCard = ({ score }) => {
  let verdict = 'Poor';
  if (score > 750) verdict = 'Excellent';
  else if (score > 650) verdict = 'Good';
  else if (score > 550) verdict = 'Fair';

  return (
    <div style={{
      marginTop: '30px',
      padding: '20px',
      border: '2px solid green',
      borderRadius: '10px',
      backgroundColor: '#f0fff0'
    }}>
      <h2>Your Predicted Credit Score:</h2>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'green' }}>{score}</p>
      <p style={{ fontSize: '1.2rem' }}>Verdict: <strong>{verdict}</strong></p>
    </div>
  );
};

export default ScoreCard;
