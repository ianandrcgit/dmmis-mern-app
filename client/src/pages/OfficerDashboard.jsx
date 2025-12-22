import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import IncidentCards from "../components/IncidentCards";
import { AnimalForm, HumanForm, HouseForm, CropForm } from "../components/EntryForms";

const OfficerDashboard = () => {
  const { logout, user } = useAuth();
  const [activeForm, setActiveForm] = useState(null);

  const renderContent = () => {
    if (activeForm === 'animal') return <AnimalForm onBack={() => setActiveForm(null)} />;
    if (activeForm === 'human') return <HumanForm onBack={() => setActiveForm(null)} />;
    if (activeForm === 'house') return <HouseForm onBack={() => setActiveForm(null)} />;
    if (activeForm === 'crop') return <CropForm onBack={() => setActiveForm(null)} />;

    return (
      <>
        <h3 style={{ marginBottom: "20px" }}>Select Incident Type to Report</h3>
        <IncidentCards onSelectForm={(id) => setActiveForm(id)} />
      </>
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "20px" }}>
        <div>
          <h2 style={{ margin: 0 }}>DMMIS Officer Portal</h2>
          <span style={{ color: "#666" }}>User: {user?.phoneOrEmail}</span>
        </div>
        <button onClick={logout} style={{ background: "#333", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Sign Out</button>
      </header>
      <main style={{ marginTop: "20px" }}>{renderContent()}</main>
    </div>
  );
};

export default OfficerDashboard;