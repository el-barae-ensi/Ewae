import React, { useState, useEffect } from "react";
import { PersonForm } from "../components/forms/PersonForm";
import { PensionerForm } from "../components/forms/PensionerForm";
import { PartnerForm } from "../components/forms/PartnerForm";
import "../components/animations.css";

const TestForms = () => {
  const [activeForm, setActiveForm] = useState("person");
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleSubmit = (formData) => {
    // For testing purposes, we'll just log the form data
    console.log("Form submitted:", formData);
    alert("Form data logged to console!");
  };

  const formStyles = {
    container: {
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh",
      background:
        theme === "light"
          ? "linear-gradient(135deg, rgba(9, 76, 59, 0.95) 0%, rgba(10, 93, 72, 0.95) 100%)"
          : "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
      transition: "background 0.5s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "40px",
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      padding: "15px 25px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
    },
    themeToggle: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "10px",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      color: "white",
      transition: "all 0.3s ease",
    },
    button: {
      padding: "12px 24px",
      background: "transparent",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    activeButton: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "2px solid rgba(255, 255, 255, 0.4)",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleFormChange = (formType) => {
    setIsAnimating(true);
    setActiveForm(formType);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const renderForm = () => {
    const formProps = {
      className: `${isAnimating ? "fadeInBlur" : ""}`,
      style: {
        opacity: isAnimating ? 0 : 1,
        transition: "opacity 0.6s ease",
      },
    };

    switch (activeForm) {
      case "person":
        return <PersonForm onSubmit={handleSubmit} {...formProps} />;
      case "pensioner":
        return <PensionerForm onSubmit={handleSubmit} {...formProps} />;
      case "partner":
        return <PartnerForm onSubmit={handleSubmit} {...formProps} />;
      default:
        return <PersonForm onSubmit={handleSubmit} {...formProps} />;
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.buttonContainer}>
        <button
          style={{
            ...formStyles.button,
            ...(activeForm === "person" ? formStyles.activeButton : {}),
          }}
          onClick={() => handleFormChange("person")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            if (activeForm !== "person") {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          <i className="bi bi-person-circle" style={{ marginRight: "8px" }}></i>
          Person Form
        </button>
        <button
          style={{
            ...formStyles.button,
            ...(activeForm === "pensioner" ? formStyles.activeButton : {}),
          }}
          onClick={() => handleFormChange("pensioner")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            if (activeForm !== "pensioner") {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          <i className="bi bi-person-hearts" style={{ marginRight: "8px" }}></i>
          Pensioner Form
        </button>
        <button
          style={{
            ...formStyles.button,
            ...(activeForm === "partner" ? formStyles.activeButton : {}),
          }}
          onClick={() => handleFormChange("partner")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            if (activeForm !== "partner") {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          <i className="bi bi-building" style={{ marginRight: "8px" }}></i>
          Partner Form
        </button>
      </div>
      <div className="progressive-load">{renderForm()}</div>
      <button
        style={formStyles.themeToggle}
        onClick={toggleTheme}
        className="hover-float"
      >
        <i className={`bi bi-${theme === "light" ? "moon" : "sun"}`}></i>
      </button>
    </div>
  );
};

export default TestForms;
