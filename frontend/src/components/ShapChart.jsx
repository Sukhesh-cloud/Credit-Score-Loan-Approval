import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const ShapChart = ({ shapValues, features }) => {
  const data = features.map((feature, i) => ({
    name: feature,
    impact: parseFloat(shapValues[i].toFixed(2)),
  }));

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ textAlign: 'center' }}>🧠 Feature Impact (SHAP)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: "Impact on Score", position: "insideBottom", offset: -5 }} />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="impact" fill="#8884d8">
            <LabelList dataKey="impact" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShapChart;
