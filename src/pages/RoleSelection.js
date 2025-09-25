import React from "react";
import "./RoleSelection.css";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css"; // Import the CSS file

function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("selectedRole", role);
    if (role === "patient") {
      navigate("/patient-login");
    } else if (role === "staff") {
      navigate("/staff-login");
    } else if (role === "admin") {
      navigate("/admin-login");
    }
  };

  return (
    <div style={styles.body}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <h1 style={styles.leftTitle}>Medicore</h1>
        <img
          src="image.png"
          alt="Stethoscope"
          style={styles.image}
        />
        <h2 style={styles.leftSubtitle}>Smarter Care Starts Here</h2>
        <p style={styles.leftText}>
          MediCore unites patients and professionals — simplifying care, records, and billing.
        </p>
        <div className="carousel-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h1 style={styles.rightTitle}>Welcome to MediCore</h1>
        <p style={styles.rightText}>
          Select your role below to access your secure healthcare dashboard.
        </p>
        <button className="role-button" onClick={() => selectRole("patient")}>I’m Patient</button>
        <button className="role-button" onClick={() => selectRole("staff")}>I’m Staff</button>
        <button className="role-button" onClick={() => selectRole("admin")}>I’m Admin</button>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Poppins, sans-serif"
  },
  leftSection: {
    width: "45%",
    backgroundColor: "#1f7a6d",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "justify",
    paddingLeft: "40px"
  },
  image: {
    width: "90%",
    margin: "20px 0"
  },
  leftTitle: {
    fontSize: "28px",
    marginBottom: "10px"
  },
  leftSubtitle: {
    marginBottom: "10px"
  },
  leftText: {
    fontSize: "15px",
    color: "#dcdcdc",
    maxWidth: "350px"
  },
  rightSection: {
    width: "55%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    textAlign: "center"
  },
  rightTitle: {
    fontSize: "26px",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  rightText: {
    fontSize: "15px",
    color: "#0a4a3f",
    marginBottom: "30px",
    maxWidth: "350px"
  }
};

export default RoleSelection;
