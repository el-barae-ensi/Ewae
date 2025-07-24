import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Authontification = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await login(credentials);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Demo accounts for testing
  const demoAccounts = [
    { username: "agent", role: "Agent de Sécurité National" },
    { username: "associative", role: "Groupe Associatif" },
    { username: "public", role: "Utilisateur Public" },
    { username: "persona", role: "Gestión Persona" },
    { username: "twaa", role: "Administrateur Twaa" },
  ];

  const handleDemoLogin = (username) => {
    setCredentials({
      username: username,
      password: "Demo123",
    });
  };

  return (
    <div className="authontification">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-section">
              <img src="/ewae.png" alt="Ewae" className="auth-logo" />
              <h1 className="login-title">Ewae Platform</h1>
              <p className="login-subtitle">Connectez-vous à votre compte</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                {error}
              </div>
            )}

            <div className="input-group">
              <label className="input-label" htmlFor="username">
                Nom d'utilisateur
              </label>
              <div className="input-field">
                <i className="bi bi-person input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Entrez votre nom d'utilisateur"
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Mot de passe
              </label>
              <div className="input-field">
                <i className="bi bi-lock input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Entrez votre mot de passe"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Se souvenir de moi
              </label>
              <button type="button" className="forgot-password-link">
                Mot de passe oublié?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-label="Loading"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Connexion...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  Connexion
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts Section */}
          <div className="demo-section">
            <div className="demo-divider">
              <span>Comptes de démonstration</span>
            </div>
            <div className="demo-accounts">
              {demoAccounts.map((account, index) => (
                <button
                  key={`demo-account-${account.username}-${index}`}
                  type="button"
                  className="demo-account-btn"
                  onClick={() => handleDemoLogin(account.username)}
                  disabled={isLoading}
                >
                  <div className="demo-account-info">
                    <span className="demo-username">{account.username}</span>
                    <span className="demo-role">{account.role}</span>
                  </div>
                  <i className="bi bi-arrow-right"></i>
                </button>
              ))}
            </div>
            <p className="demo-note">
              <i className="bi bi-info-circle"></i>
              Utilisez le mot de passe "Demo123" pour tous les comptes de
              démonstration
            </p>
          </div>
        </div>

        <div className="auth-footer">
          <p>&copy; 2024 Ewae Platform. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="#privacy">Politique de confidentialité</a>
            <a href="#terms">Conditions d'utilisation</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};
