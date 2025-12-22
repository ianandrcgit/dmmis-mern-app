import React from 'react';
import { Dog, Users, Home, Wheat } from 'lucide-react'; // Run: npm install lucide-react

const IncidentCards = ({ onSelectForm }) => {
  const categories = [
    { id: 'animal', title: 'Animal Loss', desc: 'Data entry for animal death like goat, cow, buffalo.', icon: <Dog size={32} /> },
    { id: 'human', title: 'Human Loss', desc: 'Report casualties or injuries.', icon: <Users size={32} /> },
    { id: 'house', title: 'House Damage', desc: 'Record structural damage to houses.', icon: <Home size={32} /> },
    { id: 'crop', title: 'Crop Loss', desc: 'Submit agricultural damage assessments.', icon: <Wheat size={32} /> }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {categories.map((item) => (
        <div key={item.id} style={cardStyle}>
          <div style={{ marginBottom: '10px', color: '#2563eb' }}>{item.icon}</div>
          <h3>{item.title}</h3>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>{item.desc}</p>
          <button onClick={() => onSelectForm(item.id)} style={btnStyle}>Open Form</button>
        </div>
      ))}
    </div>
  );
};

const cardStyle = { padding: '20px', border: '1px solid #ddd', borderRadius: '12px', textAlign: 'center', background: '#fff' };
const btnStyle = { marginTop: '10px', padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default IncidentCards;