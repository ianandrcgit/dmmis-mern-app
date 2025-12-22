import React from 'react';

const FormWrapper = ({ title, onBack, children }) => (
  <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
    <button onClick={onBack} style={{ marginBottom: '15px' }}>← Back</button>
    <h2>{title} Report</h2>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {children}
      <input type="text" placeholder="Beneficiary Name" required />
      <input type="text" placeholder="Taluka" required />
      <input type="text" placeholder="Village Name" required />
      <input type="date" required />
      <label>Evidence Photo (Camera or Gallery):</label>
      <input type="file" accept="image/*" capture="environment" />
      <button type="submit" style={{ padding: '10px', background: '#059669', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit Report</button>
    </form>
  </div>
);

export const AnimalForm = ({ onBack }) => (
  <FormWrapper title="Animal Loss" onBack={onBack}>
    <input type="number" placeholder="No. of Animals (Goat/Cow/Buffalo)" required />
  </FormWrapper>
);

export const HumanForm = ({ onBack }) => (
  <FormWrapper title="Human Loss" onBack={onBack}>
    <input type="number" placeholder="No. of Humans affected" required />
  </FormWrapper>
);

export const HouseForm = ({ onBack }) => (
  <FormWrapper title="House Damage" onBack={onBack}>
    <input type="number" placeholder="No. of Houses damaged" required />
  </FormWrapper>
);

export const CropForm = ({ onBack }) => (
  <FormWrapper title="Crop Loss" onBack={onBack}>
    <input type="number" placeholder="Affected Area (Acres)" required />
  </FormWrapper>
);