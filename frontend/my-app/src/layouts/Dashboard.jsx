import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout, USER_ROLES } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Navigation items based on user roles
  const getNavigationItems = () => {
    const baseItems = [
      {
        path: "overview",
        icon: "bi-house-door",
        label: "Vue d'ensemble",
        roles: ["all"],
      },
    ];

    const roleBasedItems = {
      [USER_ROLES.AGENT_SECURITE]: [
        {
          path: "associations",
          icon: "bi-building",
          label: "Associations",
          submenu: [{ path: "associations", label: "Lister les associations" }],
        },
        {
          path: "residents",
          icon: "bi-people",
          label: "Pensionnaires",
          submenu: [{ path: "residents", label: "Lister les pensionnaires" }],
        },
        {
          path: "contact-associations",
          icon: "bi-chat-dots",
          label: "Contacter Associations",
        },
        {
          path: "reports",
          icon: "bi-file-earmark-text",
          label: "Rapports",
        },
        {
          path: "alerts",
          icon: "bi-exclamation-triangle",
          label: "Alertes",
        },
      ],
      [USER_ROLES.GROUPE_ASSOCIATIF]: [
        {
          path: "manage-accounts",
          icon: "bi-person-gear",
          label: "Gérer Comptes",
        },
        {
          path: "funding-requests",
          icon: "bi-cash-coin",
          label: "Demandes de Financement",
        },
        {
          path: "complaints",
          icon: "bi-flag",
          label: "Plaintes et Signalements",
        },
        {
          path: "activity-reports",
          icon: "bi-graph-up",
          label: "Rapports d'Activité",
        },
        {
          path: "contact-association",
          icon: "bi-telephone",
          label: "Contacter Association",
        },
      ],
      [USER_ROLES.PUBLIC]: [
        {
          path: "add-declaration",
          icon: "bi-plus-circle",
          label: "Ajouter Déclaration",
        },
        {
          path: "partners",
          icon: "bi-handshake",
          label: "Partenaires",
        },
        {
          path: "add-donation",
          icon: "bi-heart",
          label: "Faire un Don",
        },
      ],
      [USER_ROLES.GESTION_PERSONA]: [
        {
          path: "consult-person",
          icon: "bi-person-check",
          label: "Consulter Personne",
        },
        {
          path: "manage-residents",
          icon: "bi-people-fill",
          label: "Gérer Pensionnaires",
        },
        {
          path: "search-resident",
          icon: "bi-search",
          label: "Rechercher Pensionnaire",
        },
      ],
      [USER_ROLES.TWAA]: [
        {
          path: "donations",
          icon: "bi-currency-dollar",
          label: "Donations",
        },
        {
          path: "statistics",
          icon: "bi-bar-chart",
          label: "Statistiques",
        },
        {
          path: "documents",
          icon: "bi-file-earmark",
          label: "Documents",
        },
        {
          path: "resources",
          icon: "bi-collection",
          label: "Ressources",
        },
        {
          path: "agents",
          icon: "bi-shield-check",
          label: "Agents",
        },
        {
          path: "detainees",
          icon: "bi-person-lock",
          label: "Détenus",
        },
        {
          path: "notifications",
          icon: "bi-bell",
          label: "Notifications",
        },
        {
          path: "contact-province",
          icon: "bi-geo",
          label: "Contacter Province",
        },
        {
          path: "police",
          icon: "bi-shield-exclamation",
          label: "Police",
        },
      ],
    };

    return [...baseItems, ...(roleBasedItems[user?.role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/ewae.png" alt="Ewae" className="logo" />
            {!sidebarCollapsed && <span className="logo-text">Ewae</span>}
          </div>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {navigationItems.map((item, index) => (
              <div
                key={`nav-item-${item.path}-${index}`}
                className="nav-item-container"
              >
                {item.submenu ? (
                  <div className="nav-item-group">
                    <div className="nav-item-header">
                      <i className={`bi ${item.icon}`}></i>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <div className="nav-submenu">
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            key={`submenu-${item.path}-${subItem.path}-${subIndex}`}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `nav-link nav-sublink ${isActive ? "active" : ""}`
                            }
                          >
                            <span>{subItem.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    title={sidebarCollapsed ? item.label : ""}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            {!sidebarCollapsed && (
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">
                  {user?.role?.replace("_", " ").toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        {/* Top Navigation Bar */}
        <div className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="sidebar-toggle"
              onClick={toggleSidebar}
              title="Toggle Sidebar"
            >
              <i className="bi bi-list"></i>
            </button>
            <h1 className="page-title">Ewae Dashboard</h1>
          </div>

          <div className="topbar-right">
            <div className="topbar-actions">
              <button
                type="button"
                className="action-btn"
                title="Notifications"
              >
                <i className="bi bi-bell"></i>
                <span className="notification-badge">3</span>
              </button>
              <button type="button" className="action-btn" title="Messages">
                <i className="bi bi-chat-dots"></i>
              </button>
              <div className="user-dropdown">
                <button type="button" className="user-dropdown-toggle">
                  <i className="bi bi-person-circle"></i>
                  <span>{user?.name}</span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <div className="user-dropdown-menu">
                  <a href="#profile" className="dropdown-item">
                    <i className="bi bi-person"></i>
                    Profile
                  </a>
                  <a href="#settings" className="dropdown-item">
                    <i className="bi bi-gear"></i>
                    Paramètres
                  </a>
                  <div className="dropdown-divider"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
