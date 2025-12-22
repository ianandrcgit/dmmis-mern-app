import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Users, FileText, LayoutGrid, Settings } from "lucide-react"; // Ensure lucide-react is installed
import CreateUser from "./systemManager/CreateUser"; // Fixed relative path
import ReportList from "../components/ReportList";

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("menu");

  const adminCards = [
    {
      id: "users",
      title: "User Management",
      desc: "Create, delete, or modify system users and officers.",
      icon: <Users size={40} color="#2563eb" />,
    },
    {
      id: "reports",
      title: "View Reports",
      desc: "Monitor and analyze all incident reports submitted from the field.",
      icon: <FileText size={40} color="#16a34a" />,
    },
    {
      id: "blank1",
      title: "Coming Soon",
      desc: "This feature is currently under development.",
      icon: <LayoutGrid size={40} color="#94a3b8" />,
    },
    {
      id: "blank2",
      title: "Coming Soon",
      desc: "This feature is currently under development.",
      icon: <Settings size={40} color="#94a3b8" />,
    }
  ];

  const renderContent = () => {
    if (activeTab === "users") {
      return (
        <div>
          <button onClick={() => setActiveTab("menu")} style={backBtnStyle}>← Back to Admin Menu</button>
          <CreateUser />
        </div>
      );
    }
    if (activeTab === "reports") {
      return (
        <div>
          <button onClick={() => setActiveTab("menu")} style={backBtnStyle}>← Back to Admin Menu</button>
          <ReportList />
        </div>
      );
    }

    return (
      <div style={cardGridStyle}>
        {adminCards.map((card) => (
          <div key={card.id} style={cardStyle}>
            <div style={iconWrapperStyle}>{card.icon}</div>
            <h3 style={{ margin: "10px 0" }}>{card.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "20px" }}>{card.desc}</p>
            <button 
              disabled={card.id.startsWith("blank")}
              onClick={() => setActiveTab(card.id)}
              style={{
                ...actionBtnStyle,
                backgroundColor: card.id.startsWith("blank") ? "#cbd5e1" : "#1e293b",
                cursor: card.id.startsWith("blank") ? "not-allowed" : "pointer"
              }}
            >
              {card.id.startsWith("blank") ? "Locked" : "Open Manager"}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>System Manager Dashboard</h1>
          <p style={{ color: "#64748b", margin: "5px 0 0 0" }}>Logged in as: {user?.phoneOrEmail}</p>
        </div>
        <button onClick={logout} style={logoutBtnStyle}>Logout</button>
      </header>
      
      <main style={{ marginTop: "20px" }}>
        {renderContent()}
      </main>
    </div>
  );
};

// --- CSS-in-JS Styles ---
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: "20px" };
const cardGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" };
const cardStyle = { background: "#fff", padding: "30px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" };
const iconWrapperStyle = { marginBottom: "15px", display: "flex", justifyContent: "center" };
const actionBtnStyle = { color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", width: "100%" };
const backBtnStyle = { marginBottom: "20px", background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" };
const logoutBtnStyle = { background: "#ef4444", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };

export default AdminDashboard;