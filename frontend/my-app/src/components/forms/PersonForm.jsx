import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import "../animations.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toast, ToastContainer } from "../Toast";

export const PersonForm = ({ initialData, onSubmit, formType = "create" }) => {
  const [formData, setFormData] = useState(
    initialData || {
      login: "",
      password: "",
      nom: "",
      prenom: "",
      genre: "",
      role: "",
    },
  );
  const [fieldStatus, setFieldStatus] = useState({});
  const formRef = useRef(null);
  const [toasts, setToasts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate field
    validateField(id, value);

    // Add ripple effect to input field
    const field = e.target.closest(".input-field");
    if (field) {
      field.style.transform = "scale(1.02)";
      setTimeout(() => {
        field.style.transform = "scale(1)";
      }, 200);
    }
  };

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const validateField = (id, value) => {
    let isValid = false;
    switch (id) {
      case "login":
        isValid = value.length >= 3;
        break;
      case "password":
        isValid = value.length >= 6;
        break;
      case "nom":
      case "prenom":
        isValid = value.length >= 2;
        break;
      case "genre":
        isValid = value !== "";
        break;
      case "role":
        isValid = value.length >= 2;
        break;
      default:
        isValid = true;
    }
    setFieldStatus((prev) => ({
      ...prev,
      [id]: isValid,
    }));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const allFieldsValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key]),
    );

    if (!allFieldsValid) {
      addToast("Please check all fields are filled correctly", "error");
      formRef.current.classList.add("error-animation");
      setTimeout(() => {
        formRef.current.classList.remove("error-animation");
      }, 500);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      addToast(
        `Person successfully ${formType === "create" ? "created" : "updated"}!`,
      );
    } catch (error) {
      addToast(error.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="authontification">
      <div
        className="auth-card hover-pulse"
        style={{
          opacity: isSubmitting ? 0.7 : 1,
          transform: `scale(${isSubmitting ? 0.98 : 1})`,
        }}
        ref={formRef}
      >
        <div className="form-header">
          <i
            className="bi bi-person-plus-fill"
            style={{
              fontSize: "2em",
              color: "var(--green-dark)",
              marginBottom: "15px",
            }}
          ></i>
          <h1 className="login-title">
            {formType === "create" ? "Add Person" : "Edit Person"}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="login">
              Login
            </label>
            <div
              className={`input-field ${fieldStatus.login ? "success-animation" : ""}`}
            >
              <i className="bi bi-person input-icon" />
              <input
                type="text"
                id="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Enter login"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="input-field">
              <i className="bi bi-lock input-icon" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="nom">
              Last Name
            </label>
            <div className="input-field">
              <i className="bi bi-person-vcard input-icon" />
              <input
                type="text"
                id="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="prenom">
              First Name
            </label>
            <div className="input-field">
              <i className="bi bi-person-vcard-fill input-icon" />
              <input
                type="text"
                id="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="genre">
              Gender
            </label>
            <div className="input-field">
              <i className="bi bi-gender-ambiguous input-icon" />
              <select
                id="genre"
                value={formData.genre}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="role">
              Role
            </label>
            <div className="input-field">
              <i className="bi bi-person-badge input-icon" />
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isSubmitting ? (
              <div className="spinner">
                <i className="bi bi-arrow-repeat spin"></i>
              </div>
            ) : (
              <>
                <i
                  className="bi bi-check2-circle"
                  style={{ marginRight: "8px" }}
                ></i>
                {formType === "create" ? "Add Person" : "Update Person"}
              </>
            )}
          </button>
        </form>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};
