import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const { user, USER_ROLES } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data based on user role
  useEffect(() => {
    const loadDashboardData = () => {
      let mockStats = {};
      let mockActivities = [];
      let mockAlerts = [];

      switch (user?.role) {
        case USER_ROLES.AGENT_SECURITE:
          mockStats = {
            totalAssociations: 156,
            activeAssociations: 142,
            totalResidents: 2340,
            highRiskResidents: 23,
            pendingReports: 8,
            newAlerts: 3,
          };
          mockActivities = [
            {
              id: 1,
              type: "inspection",
              title: "Inspection Association Al Amal",
              time: "2 heures",
              status: "completed",
            },
            {
              id: 2,
              type: "alert",
              title: "Nouvelle alerte de sécurité",
              time: "4 heures",
              status: "pending",
            },
            {
              id: 3,
              type: "report",
              title: "Rapport mensuel généré",
              time: "1 jour",
              status: "completed",
            },
            {
              id: 4,
              type: "contact",
              title: "Contact avec Association Espoir",
              time: "2 jours",
              status: "completed",
            },
          ];
          mockAlerts = [
            {
              id: 1,
              type: "warning",
              message: "Association en retard de rapport",
              level: "medium",
            },
            {
              id: 2,
              type: "info",
              message: "3 nouvelles demandes d'inspection",
              level: "low",
            },
            {
              id: 3,
              type: "danger",
              message: "Incident signalé - Prison Rabat",
              level: "high",
            },
          ];
          break;

        case USER_ROLES.GROUPE_ASSOCIATIF:
          mockStats = {
            totalAccounts: 45,
            pendingRequests: 12,
            approvedFunding: 8,
            totalComplaints: 3,
            resolvedComplaints: 2,
            monthlyBudget: 250000,
          };
          mockActivities = [
            {
              id: 1,
              type: "funding",
              title: "Demande de financement approuvée",
              time: "1 heure",
              status: "completed",
            },
            {
              id: 2,
              type: "complaint",
              title: "Nouvelle plainte reçue",
              time: "3 heures",
              status: "pending",
            },
            {
              id: 3,
              type: "account",
              title: "Nouveau compte association créé",
              time: "1 jour",
              status: "completed",
            },
            {
              id: 4,
              type: "report",
              title: "Rapport d'activité soumis",
              time: "2 jours",
              status: "completed",
            },
          ];
          mockAlerts = [
            {
              id: 1,
              type: "info",
              message: "12 demandes de financement en attente",
              level: "medium",
            },
            {
              id: 2,
              type: "warning",
              message: "Budget mensuel à 85%",
              level: "medium",
            },
            {
              id: 3,
              type: "success",
              message: "8 financements approuvés ce mois",
              level: "low",
            },
          ];
          break;

        case USER_ROLES.PUBLIC:
          mockStats = {
            totalPartners: 78,
            activePartners: 65,
            totalDonations: 45,
            monthlyDonations: 12,
            totalDeclarations: 23,
            pendingDeclarations: 3,
          };
          mockActivities = [
            {
              id: 1,
              type: "donation",
              title: "Don effectué avec succès",
              time: "30 minutes",
              status: "completed",
            },
            {
              id: 2,
              type: "declaration",
              title: "Déclaration soumise",
              time: "2 heures",
              status: "pending",
            },
            {
              id: 3,
              type: "partner",
              title: "Nouveau partenaire ajouté",
              time: "1 jour",
              status: "completed",
            },
            {
              id: 4,
              type: "info",
              title: "Mise à jour des conditions",
              time: "3 jours",
              status: "completed",
            },
          ];
          mockAlerts = [
            {
              id: 1,
              type: "info",
              message: "3 déclarations en cours de traitement",
              level: "low",
            },
            {
              id: 2,
              type: "success",
              message: "Don de 5000 DH traité",
              level: "low",
            },
            {
              id: 3,
              type: "info",
              message: "65 partenaires actifs ce mois",
              level: "low",
            },
          ];
          break;

        case USER_ROLES.GESTION_PERSONA:
          mockStats = {
            totalPersons: 1890,
            activeResidents: 1654,
            newAdmissions: 23,
            releases: 15,
            transfersIn: 8,
            transfersOut: 12,
          };
          mockActivities = [
            {
              id: 1,
              type: "admission",
              title: "Nouvelle admission traitée",
              time: "1 heure",
              status: "completed",
            },
            {
              id: 2,
              type: "transfer",
              title: "Transfert vers Fès programmé",
              time: "2 heures",
              status: "pending",
            },
            {
              id: 3,
              type: "release",
              title: "Libération conditionnelle approuvée",
              time: "4 heures",
              status: "completed",
            },
            {
              id: 4,
              type: "search",
              title: "Recherche de pensionnaire effectuée",
              time: "1 jour",
              status: "completed",
            },
          ];
          mockAlerts = [
            {
              id: 1,
              type: "warning",
              message: "23 nouvelles admissions ce mois",
              level: "medium",
            },
            {
              id: 2,
              type: "info",
              message: "8 transferts entrants programmés",
              level: "low",
            },
            {
              id: 3,
              type: "success",
              message: "15 libérations traitées avec succès",
              level: "low",
            },
          ];
          break;

        case USER_ROLES.TWAA:
          mockStats = {
            totalDonations: 156,
            monthlyAmount: 450000,
            totalDocuments: 234,
            pendingApprovals: 12,
            activeAgents: 45,
            totalDetainees: 2340,
            activeAlerts: 8,
          };
          mockActivities = [
            {
              id: 1,
              type: "donation",
              title: "Donation de 50000 DH reçue",
              time: "30 minutes",
              status: "completed",
            },
            {
              id: 2,
              type: "document",
              title: "Nouveau document approuvé",
              time: "1 heure",
              status: "completed",
            },
            {
              id: 3,
              type: "notification",
              title: "Notification envoyée aux provinces",
              time: "2 heures",
              status: "completed",
            },
            {
              id: 4,
              type: "police",
              title: "Incident signalé à la police",
              time: "3 heures",
              status: "pending",
            },
          ];
          mockAlerts = [
            {
              id: 1,
              type: "danger",
              message: "8 alertes de sécurité actives",
              level: "high",
            },
            {
              id: 2,
              type: "warning",
              message: "12 documents en attente d'approbation",
              level: "medium",
            },
            {
              id: 3,
              type: "success",
              message: "450K DH collectés ce mois",
              level: "low",
            },
          ];
          break;

        default:
          mockStats = {};
          mockActivities = [];
          mockAlerts = [];
      }

      setTimeout(() => {
        setStats(mockStats);
        setRecentActivities(mockActivities);
        setAlerts(mockAlerts);
        setLoading(false);
      }, 800);
    };

    if (user) {
      loadDashboardData();
    }
  }, [user, USER_ROLES]);

  const getActivityIcon = (type) => {
    const iconMap = {
      inspection: "bi-search",
      alert: "bi-exclamation-triangle",
      report: "bi-file-earmark-text",
      contact: "bi-telephone",
      funding: "bi-cash-coin",
      complaint: "bi-flag",
      account: "bi-person-plus",
      donation: "bi-heart",
      declaration: "bi-file-earmark-plus",
      partner: "bi-handshake",
      admission: "bi-person-plus-fill",
      transfer: "bi-arrow-left-right",
      release: "bi-door-open",
      search: "bi-search",
      document: "bi-file-earmark",
      notification: "bi-bell",
      police: "bi-shield",
      info: "bi-info-circle",
    };
    return iconMap[type] || "bi-circle";
  };

  const getActivityColor = (status) => {
    const colorMap = {
      completed: "success",
      pending: "warning",
      failed: "danger",
    };
    return colorMap[status] || "secondary";
  };

  const getAlertClass = (level) => {
    const classMap = {
      high: "alert-danger",
      medium: "alert-warning",
      low: "alert-info",
    };
    return classMap[level] || "alert-secondary";
  };

  const renderRoleSpecificStats = () => {
    const statsConfig = {
      [USER_ROLES.AGENT_SECURITE]: [
        {
          key: "totalAssociations",
          label: "Total Associations",
          icon: "bi-building",
          color: "primary",
        },
        {
          key: "activeAssociations",
          label: "Associations Actives",
          icon: "bi-check-circle",
          color: "success",
        },
        {
          key: "totalResidents",
          label: "Total Pensionnaires",
          icon: "bi-people",
          color: "info",
        },
        {
          key: "highRiskResidents",
          label: "Risque Élevé",
          icon: "bi-exclamation-triangle",
          color: "warning",
        },
        {
          key: "pendingReports",
          label: "Rapports en Attente",
          icon: "bi-clock",
          color: "secondary",
        },
        {
          key: "newAlerts",
          label: "Nouvelles Alertes",
          icon: "bi-bell",
          color: "danger",
        },
      ],
      [USER_ROLES.GROUPE_ASSOCIATIF]: [
        {
          key: "totalAccounts",
          label: "Comptes Associations",
          icon: "bi-people",
          color: "primary",
        },
        {
          key: "pendingRequests",
          label: "Demandes en Attente",
          icon: "bi-clock",
          color: "warning",
        },
        {
          key: "approvedFunding",
          label: "Financements Approuvés",
          icon: "bi-check-circle",
          color: "success",
        },
        {
          key: "totalComplaints",
          label: "Total Plaintes",
          icon: "bi-flag",
          color: "info",
        },
        {
          key: "resolvedComplaints",
          label: "Plaintes Résolues",
          icon: "bi-check",
          color: "success",
        },
        {
          key: "monthlyBudget",
          label: "Budget Mensuel (DH)",
          icon: "bi-cash",
          color: "primary",
          format: "currency",
        },
      ],
      [USER_ROLES.PUBLIC]: [
        {
          key: "totalPartners",
          label: "Total Partenaires",
          icon: "bi-handshake",
          color: "primary",
        },
        {
          key: "activePartners",
          label: "Partenaires Actifs",
          icon: "bi-check-circle",
          color: "success",
        },
        {
          key: "totalDonations",
          label: "Total Donations",
          icon: "bi-heart",
          color: "danger",
        },
        {
          key: "monthlyDonations",
          label: "Donations ce Mois",
          icon: "bi-calendar",
          color: "info",
        },
        {
          key: "totalDeclarations",
          label: "Total Déclarations",
          icon: "bi-file-earmark",
          color: "secondary",
        },
        {
          key: "pendingDeclarations",
          label: "En Attente",
          icon: "bi-clock",
          color: "warning",
        },
      ],
      [USER_ROLES.GESTION_PERSONA]: [
        {
          key: "totalPersons",
          label: "Total Personnes",
          icon: "bi-people",
          color: "primary",
        },
        {
          key: "activeResidents",
          label: "Pensionnaires Actifs",
          icon: "bi-person-check",
          color: "success",
        },
        {
          key: "newAdmissions",
          label: "Nouvelles Admissions",
          icon: "bi-person-plus",
          color: "info",
        },
        {
          key: "releases",
          label: "Libérations",
          icon: "bi-door-open",
          color: "success",
        },
        {
          key: "transfersIn",
          label: "Transferts Entrants",
          icon: "bi-arrow-down",
          color: "warning",
        },
        {
          key: "transfersOut",
          label: "Transferts Sortants",
          icon: "bi-arrow-up",
          color: "secondary",
        },
      ],
      [USER_ROLES.TWAA]: [
        {
          key: "totalDonations",
          label: "Total Donations",
          icon: "bi-heart",
          color: "primary",
        },
        {
          key: "monthlyAmount",
          label: "Montant Mensuel (DH)",
          icon: "bi-cash",
          color: "success",
          format: "currency",
        },
        {
          key: "totalDocuments",
          label: "Total Documents",
          icon: "bi-file-earmark",
          color: "info",
        },
        {
          key: "pendingApprovals",
          label: "En Attente d'Approbation",
          icon: "bi-clock",
          color: "warning",
        },
        {
          key: "activeAgents",
          label: "Agents Actifs",
          icon: "bi-shield",
          color: "secondary",
        },
        {
          key: "totalDetainees",
          label: "Total Détenus",
          icon: "bi-person-lock",
          color: "danger",
        },
      ],
    };

    const config = statsConfig[user?.role] || [];

    return (
      <div className="row mb-4">
        {config.map((stat, index) => (
          <div key={stat.key} className="col-md-4 col-lg-2 mb-3">
            <div className={`card bg-${stat.color} text-white h-100`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6
                      className="card-title mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {stat.label}
                    </h6>
                    <h4 className="mb-0">
                      {stat.format === "currency"
                        ? `${(stats[stat.key] || 0).toLocaleString()}`
                        : (stats[stat.key] || 0).toLocaleString()}
                    </h4>
                  </div>
                  <div className="align-self-center">
                    <i
                      className={`bi ${stat.icon}`}
                      style={{ fontSize: "1.5rem", opacity: 0.8 }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getQuickActions = () => {
    const actionsConfig = {
      [USER_ROLES.AGENT_SECURITE]: [
        {
          label: "Voir Associations",
          path: "/dashboard/associations",
          icon: "bi-building",
          color: "primary",
        },
        {
          label: "Lister Pensionnaires",
          path: "/dashboard/residents",
          icon: "bi-people",
          color: "info",
        },
        {
          label: "Générer Rapport",
          path: "/dashboard/reports",
          icon: "bi-file-earmark-text",
          color: "success",
        },
        {
          label: "Gérer Alertes",
          path: "/dashboard/alerts",
          icon: "bi-exclamation-triangle",
          color: "warning",
        },
      ],
      [USER_ROLES.GROUPE_ASSOCIATIF]: [
        {
          label: "Gérer Comptes",
          path: "/dashboard/manage-accounts",
          icon: "bi-person-gear",
          color: "primary",
        },
        {
          label: "Demandes Financement",
          path: "/dashboard/funding-requests",
          icon: "bi-cash-coin",
          color: "success",
        },
        {
          label: "Gérer Plaintes",
          path: "/dashboard/complaints",
          icon: "bi-flag",
          color: "warning",
        },
        {
          label: "Rapports Activité",
          path: "/dashboard/activity-reports",
          icon: "bi-graph-up",
          color: "info",
        },
      ],
      [USER_ROLES.PUBLIC]: [
        {
          label: "Ajouter Déclaration",
          path: "/dashboard/add-declaration",
          icon: "bi-plus-circle",
          color: "primary",
        },
        {
          label: "Voir Partenaires",
          path: "/dashboard/partners",
          icon: "bi-handshake",
          color: "info",
        },
        {
          label: "Faire Don",
          path: "/dashboard/add-donation",
          icon: "bi-heart",
          color: "danger",
        },
      ],
      [USER_ROLES.GESTION_PERSONA]: [
        {
          label: "Consulter Personne",
          path: "/dashboard/consult-person",
          icon: "bi-person-check",
          color: "primary",
        },
        {
          label: "Gérer Pensionnaires",
          path: "/dashboard/manage-residents",
          icon: "bi-people-fill",
          color: "info",
        },
        {
          label: "Rechercher",
          path: "/dashboard/search-resident",
          icon: "bi-search",
          color: "secondary",
        },
      ],
      [USER_ROLES.TWAA]: [
        {
          label: "Gérer Donations",
          path: "/dashboard/donations",
          icon: "bi-currency-dollar",
          color: "success",
        },
        {
          label: "Voir Statistiques",
          path: "/dashboard/statistics",
          icon: "bi-bar-chart",
          color: "info",
        },
        {
          label: "Gérer Détenus",
          path: "/dashboard/detainees",
          icon: "bi-person-lock",
          color: "warning",
        },
        {
          label: "Notifications",
          path: "/dashboard/notifications",
          icon: "bi-bell",
          color: "primary",
        },
        {
          label: "Module Police",
          path: "/dashboard/police",
          icon: "bi-shield-exclamation",
          color: "danger",
        },
      ],
    };

    return actionsConfig[user?.role] || [];
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Loading"
        >
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Tableau de Bord</h2>
              <p className="text-muted">
                Bienvenue, {user?.name} -{" "}
                {user?.role?.replace("_", " ").toUpperCase()}
              </p>
            </div>
            <div className="text-end">
              <small className="text-muted">
                Dernière mise à jour: {new Date().toLocaleString("fr-FR")}
              </small>
            </div>
          </div>

          {/* Role-specific Statistics */}
          {renderRoleSpecificStats()}

          <div className="row">
            {/* Quick Actions */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Actions Rapides</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {getQuickActions().map((action, index) => (
                      <div
                        key={`quick-action-${action.path}-${index}`}
                        className="col-md-6 col-lg-4 mb-3"
                      >
                        <button
                          type="button"
                          className={`btn btn-outline-${action.color} w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3`}
                          onClick={() => navigate(action.path)}
                          style={{ minHeight: "80px" }}
                        >
                          <i
                            className={`bi ${action.icon} mb-2`}
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <span className="text-center">{action.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Activités Récentes</h5>
                </div>
                <div className="card-body">
                  {recentActivities.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="list-group-item border-0 px-0"
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className={`me-3 text-${getActivityColor(activity.status)}`}
                            >
                              <i
                                className={`bi ${getActivityIcon(activity.type)}`}
                                style={{ fontSize: "1.2rem" }}
                              ></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{activity.title}</h6>
                              <small className="text-muted">
                                Il y a {activity.time}
                              </small>
                            </div>
                            <div>
                              <span
                                className={`badge bg-${getActivityColor(activity.status)}`}
                              >
                                {activity.status === "completed"
                                  ? "Terminé"
                                  : activity.status === "pending"
                                    ? "En cours"
                                    : activity.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i
                        className="bi bi-clock-history"
                        style={{ fontSize: "3rem", color: "#ccc" }}
                      ></i>
                      <p className="text-muted mt-2">Aucune activité récente</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Alerts and Notifications */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Alertes et Notifications</h5>
                </div>
                <div className="card-body">
                  {alerts.length > 0 ? (
                    <div>
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`alert ${getAlertClass(alert.level)} mb-3`}
                          role="alert"
                        >
                          <div className="d-flex align-items-start">
                            <div className="me-2">
                              <i
                                className={`bi ${
                                  alert.level === "high"
                                    ? "bi-exclamation-triangle-fill"
                                    : alert.level === "medium"
                                      ? "bi-exclamation-circle-fill"
                                      : "bi-info-circle-fill"
                                }`}
                              ></i>
                            </div>
                            <div className="flex-grow-1">
                              <small className="d-block">{alert.message}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i
                        className="bi bi-bell"
                        style={{ fontSize: "3rem", color: "#ccc" }}
                      ></i>
                      <p className="text-muted mt-2">Aucune alerte</p>
                    </div>
                  )}
                </div>
              </div>

              {/* System Status */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="mb-0">État du Système</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Serveur Principal</span>
                    <span className="badge bg-success">En ligne</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Base de Données</span>
                    <span className="badge bg-success">Opérationnelle</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Services de Sauvegarde</span>
                    <span className="badge bg-warning">Maintenance</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Connectivité Réseau</span>
                    <span className="badge bg-success">Excellente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
