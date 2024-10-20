import React from "react";
import logoImg from "./AACTLog.png";
import './logo.css'; 

const logo: React.FC = () => {
  return (
    <div className="logo-container">
      <img 
        src={logoImg} 
        alt="AACT logo" 
        className="logo-img"
        title="AACT Organization"
      />
      <div className="logo-heading">Anjuman e Ashrafiyah Charitable Trust (AACT)</div>
    </div>
  );
};

export default logo;
