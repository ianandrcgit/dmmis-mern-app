import React from "react";
import CreateUser from "./systemManager/CreateUser";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Control Panel</h1>
        <div>
          <span style={{ marginRight: "10px" }}>Admin: {user?.phoneOrEmail}</span>
          <button onClick={logout} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>
            Logout
          </button>
        </div>
      </header>

      <hr />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginTop: "20px" }}>
        {/* User Creation Section */}
        <section>
          <CreateUser />
        </section>

        {/* System Overview Section */}
        <section style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
          <h3>System Activity</h3>
          <p>Welcome to the management dashboard. You can add new officers here. Registered officers will then be able to log in and report incidents like the one successfully submitted recently.</p>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;