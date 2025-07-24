import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AlertsManagement = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    priority: "medium",
    type: "system",
    targetEntity: "",
    actionRequired: "",
  });

  // Mock data for alerts
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        title: "Correspondance suspecte détectée",
        description:
          "Correspondance inhabituelle entre pensionnaire Ahmed Benali et contact externe non autorisé",
        type: "correspondence",
        priority: "high",
        status: "new",
        createdDate: "2024-02-15T14:30:00",
        targetEntity: "Pensionnaire Ahmed Benali",
        entityType: "resident",
        entityId: 1,
        location: "Association Al Amal",
        assignedTo: "Agent de Sécurité",
        evidence: ["Email intercepté", "Logs de communication"],
        actionRequired: "Vérification immédiate des communications",
        riskLevel: "high",
        category: "security",
        lastUpdated: "2024-02-15T14:30:00",
        notes: "Nécessite une enquête approfondie",
      },
      {
        id: 2,
        title: "Activité financière anormale",
        description:
          "Transactions financières inhabituelles détectées pour l'Association Solidarité",
        type: "financial",
        priority: "urgent",
        status: "investigating",
        createdDate: "2024-02-14T09:15:00",
        targetEntity: "Association Solidarité",
        entityType: "association",
        entityId: 4,
        location: "Fès-Meknès",
        assignedTo: "Agent Financier",
        evidence: ["Relevés bancaires", "Factures suspectes"],
        actionRequired: "Audit comptable urgent",
        riskLevel: "critical",
        category: "financial",
        lastUpdated: "2024-02-15T10:20:00",
        notes: "Possibles détournements de fonds",
      },
      {
        id: 3,
        title: "Absence prolongée non justifiée",
        description:
          "Le pensionnaire Mohamed Alaoui n'a pas été vu depuis 3 jours sans autorisation",
        type: "absence",
        priority: "high",
        status: "resolved",
        createdDate: "2024-02-10T16:45:00",
        targetEntity: "Mohamed Alaoui",
        entityType: "resident",
        entityId: 3,
        location: "Association Jeunesse Active",
        assignedTo: "Travailleur Social",
        evidence: ["Registre de présence", "Témoignages"],
        actionRequired: "Localisation et vérification",
        riskLevel: "medium",
        category: "welfare",
        lastUpdated: "2024-02-13T11:30:00",
        notes: "Résolu: Pensionnaire retrouvé chez sa famille",
        resolutionDate: "2024-02-13T11:30:00",
        resolution:
          "Le pensionnaire était chez sa famille pour une urgence médicale. Procédure d'autorisation mise en place.",
      },
      {
        id: 4,
        title: "Violation des règles de sécurité",
        description:
          "Tentative d'introduction d'objets interdits dans l'Association Al Amal",
        type: "security",
        priority: "medium",
        status: "pending",
        createdDate: "2024-02-12T13:20:00",
        targetEntity: "Association Al Amal",
        entityType: "association",
        entityId: 1,
        location: "Rabat-Salé-Kénitra",
        assignedTo: "Agent de Sécurité",
        evidence: ["Vidéosurveillance", "Rapport de sécurité"],
        actionRequired: "Renforcement des contrôles d'accès",
        riskLevel: "medium",
        category: "security",
        lastUpdated: "2024-02-12T13:20:00",
        notes: "En attente de mesures correctives",
      },
      {
        id: 5,
        title: "Alerte médicale - Pensionnaire à risque",
        description:
          "État de santé dégradé de Fatima Ouali nécessitant une surveillance médicale accrue",
        type: "medical",
        priority: "high",
        status: "monitoring",
        createdDate: "2024-02-11T08:00:00",
        targetEntity: "Fatima Ouali",
        entityType: "resident",
        entityId: 4,
        location: "Centre de Développement Local",
        assignedTo: "Personnel Médical",
        evidence: ["Rapport médical", "Observations infirmières"],
        actionRequired: "Suivi médical quotidien",
        riskLevel: "high",
        category: "medical",
        lastUpdated: "2024-02-15T07:30:00",
        notes: "Surveillance continue en cours",
      },
      {
        id: 6,
        title: "Comportement inhabituel détecté",
        description:
          "Changement de comportement significatif observé chez plusieurs pensionnaires de la Fondation Espoir",
        type: "behavioral",
        priority: "medium",
        status: "new",
        createdDate: "2024-02-09T14:15:00",
        targetEntity: "Fondation Espoir",
        entityType: "association",
        entityId: 2,
        location: "Casablanca-Settat",
        assignedTo: "Psychologue",
        evidence: ["Rapports comportementaux", "Observations du personnel"],
        actionRequired: "Évaluation psychologique",
        riskLevel: "medium",
        category: "behavioral",
        lastUpdated: "2024-02-09T14:15:00",
        notes: "Évaluation en cours de programmation",
      },
    ];

    setTimeout(() => {
      setAlerts(mockAlerts);
      setFilteredAlerts(mockAlerts);
      setLoading(false);
    }, 1200);
  }, []);

  // Filter alerts based on search and filters
  useEffect(() => {
    let filtered = alerts;

    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.priority === priorityFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((alert) => alert.type === typeFilter);
    }

    setFilteredAlerts(filtered);
  }, [searchTerm, statusFilter, priorityFilter, typeFilter, alerts]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: {
        class: "badge bg-primary",
        text: "Nouveau",
        icon: "bi-exclamation-circle",
      },
      investigating: {
        class: "badge bg-warning",
        text: "En enquête",
        icon: "bi-search",
      },
      pending: { class: "badge bg-info", text: "En attente", icon: "bi-clock" },
      monitoring: {
        class: "badge bg-secondary",
        text: "Surveillance",
        icon: "bi-eye",
      },
      resolved: {
        class: "badge bg-success",
        text: "Résolu",
        icon: "bi-check-circle",
      },
      closed: { class: "badge bg-dark", text: "Fermé", icon: "bi-x-circle" },
    };
    return (
      statusConfig[status] || {
        class: "badge bg-secondary",
        text: status,
        icon: "bi-question",
      }
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: {
        class: "badge bg-success",
        text: "Faible",
        icon: "bi-arrow-down-circle",
      },
      medium: {
        class: "badge bg-warning",
        text: "Moyen",
        icon: "bi-dash-circle",
      },
      high: {
        class: "badge bg-orange text-white",
        text: "Élevé",
        icon: "bi-arrow-up-circle",
      },
      urgent: {
        class: "badge bg-danger",
        text: "Urgent",
        icon: "bi-exclamation-triangle-fill",
      },
      critical: {
        class: "badge bg-danger",
        text: "Critique",
        icon: "bi-lightning-fill",
      },
    };
    return (
      priorityConfig[priority] || {
        class: "badge bg-secondary",
        text: priority,
        icon: "bi-question",
      }
    );
  };

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      low: { class: "text-success", text: "Faible", icon: "bi-shield-check" },
      medium: {
        class: "text-warning",
        text: "Moyen",
        icon: "bi-shield-exclamation",
      },
      high: { class: "text-danger", text: "Élevé", icon: "bi-shield-x" },
      critical: {
        class: "text-danger fw-bold",
        text: "Critique",
        icon: "bi-shield-slash",
      },
    };
    return (
      riskConfig[riskLevel] || {
        class: "text-secondary",
        text: riskLevel,
        icon: "bi-shield",
      }
    );
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      correspondence: "bi-envelope-exclamation",
      financial: "bi-currency-dollar",
      absence: "bi-person-x",
      security: "bi-shield-exclamation",
      medical: "bi-heart-pulse",
      behavioral: "bi-person-exclamation",
      system: "bi-gear",
      compliance: "bi-clipboard-check",
    };
    return typeIcons[type] || "bi-exclamation-triangle";
  };

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleStatusUpdate = (alertId, newStatus) => {
    const updatedAlerts = alerts.map((alert) =>
      alert.id === alertId
        ? { ...alert, status: newStatus, lastUpdated: new Date().toISOString() }
        : alert,
    );
    setAlerts(updatedAlerts);
    setFilteredAlerts(
      updatedAlerts.filter((alert) =>
        filteredAlerts.some((filtered) => filtered.id === alert.id),
      ),
    );
  };

  const handleCreateAlert = () => {
    const alert = {
      id: alerts.length + 1,
      title: newAlert.title,
      description: newAlert.description,
      type: newAlert.type,
      priority: newAlert.priority,
      status: "new",
      createdDate: new Date().toISOString(),
      targetEntity: newAlert.targetEntity,
      entityType: "manual",
      assignedTo: user.name,
      evidence: [],
      actionRequired: newAlert.actionRequired,
      riskLevel:
        newAlert.priority === "urgent" ? "critical" : newAlert.priority,
      category: newAlert.type,
      lastUpdated: new Date().toISOString(),
      notes: "",
    };

    setAlerts([alert, ...alerts]);
    setFilteredAlerts([alert, ...filteredAlerts]);
    setShowCreateModal(false);
    setNewAlert({
      title: "",
      description: "",
      priority: "medium",
      type: "system",
      targetEntity: "",
      actionRequired: "",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("fr-FR");
  };

  const getTimeSince = (dateString) => {
    const now = new Date();
    const alertDate = new Date(dateString);
    const diffInHours = Math.floor((now - alertDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Il y a moins d'une heure";
    if (diffInHours < 24)
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
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
              <h2 className="mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Gestion des Alertes
              </h2>
              <p className="text-muted mb-0">
                Surveillance et gestion des alertes de correspondance
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowCreateModal(true)}
              >
                <i className="bi bi-plus me-1"></i>
                Nouvelle Alerte
              </button>
              <button type="button" className="btn btn-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Rechercher</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Titre, entité, description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="statusFilter" className="form-label">
                    Statut
                  </label>
                  <select
                    id="statusFilter"
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="new">Nouveau</option>
                    <option value="investigating">En enquête</option>
                    <option value="pending">En attente</option>
                    <option value="monitoring">Surveillance</option>
                    <option value="resolved">Résolu</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="priorityFilter" className="form-label">
                    Priorité
                  </label>
                  <select
                    id="priorityFilter"
                    className="form-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">Toutes</option>
                    <option value="critical">Critique</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">Élevé</option>
                    <option value="medium">Moyen</option>
                    <option value="low">Faible</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="typeFilter" className="form-label">
                    Type
                  </label>
                  <select
                    id="typeFilter"
                    className="form-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    <option value="correspondence">Correspondance</option>
                    <option value="financial">Financier</option>
                    <option value="security">Sécurité</option>
                    <option value="medical">Médical</option>
                    <option value="behavioral">Comportemental</option>
                    <option value="absence">Absence</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-2">
              <div className="card bg-primary text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-exclamation-triangle display-6"></i>
                  <h4 className="mt-2 mb-0">{alerts.length}</h4>
                  <small>Total</small>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-danger text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-lightning-fill display-6"></i>
                  <h4 className="mt-2 mb-0">
                    {
                      alerts.filter(
                        (a) =>
                          a.priority === "critical" || a.priority === "urgent",
                      ).length
                    }
                  </h4>
                  <small>Critiques</small>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-warning text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-search display-6"></i>
                  <h4 className="mt-2 mb-0">
                    {alerts.filter((a) => a.status === "investigating").length}
                  </h4>
                  <small>En enquête</small>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-info text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-clock display-6"></i>
                  <h4 className="mt-2 mb-0">
                    {
                      alerts.filter(
                        (a) => a.status === "pending" || a.status === "new",
                      ).length
                    }
                  </h4>
                  <small>En attente</small>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-secondary text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-eye display-6"></i>
                  <h4 className="mt-2 mb-0">
                    {alerts.filter((a) => a.status === "monitoring").length}
                  </h4>
                  <small>Surveillance</small>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-success text-white">
                <div className="card-body text-center py-3">
                  <i className="bi bi-check-circle display-6"></i>
                  <h4 className="mt-2 mb-0">
                    {alerts.filter((a) => a.status === "resolved").length}
                  </h4>
                  <small>Résolues</small>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="card">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {filteredAlerts.map((alert) => {
                  const statusBadge = getStatusBadge(alert.status);
                  const priorityBadge = getPriorityBadge(alert.priority);
                  const riskBadge = getRiskBadge(alert.riskLevel);

                  return (
                    <div
                      key={alert.id}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <div className="me-3">
                              <div
                                className={`alert-icon bg-${alert.priority === "critical" || alert.priority === "urgent" ? "danger" : alert.priority === "high" ? "warning" : "info"} text-white rounded-circle d-flex align-items-center justify-content-center`}
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i
                                  className={`bi ${getTypeIcon(alert.type)}`}
                                ></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <h6 className="mb-0">{alert.title}</h6>
                                <span className={priorityBadge.class}>
                                  <i
                                    className={`${priorityBadge.icon} me-1`}
                                  ></i>
                                  {priorityBadge.text}
                                </span>
                                <span className={statusBadge.class}>
                                  <i className={`${statusBadge.icon} me-1`}></i>
                                  {statusBadge.text}
                                </span>
                              </div>
                              <p className="mb-1 text-muted">
                                {alert.description}
                              </p>
                              <div className="d-flex align-items-center gap-3 text-sm">
                                <span>
                                  <i className="bi bi-person-circle me-1"></i>
                                  <strong>{alert.targetEntity}</strong>
                                </span>
                                <span>
                                  <i className="bi bi-geo-alt me-1"></i>
                                  {alert.location}
                                </span>
                                <span className={riskBadge.class}>
                                  <i className={`${riskBadge.icon} me-1`}></i>
                                  Risque {riskBadge.text}
                                </span>
                                <span>
                                  <i className="bi bi-person-badge me-1"></i>
                                  {alert.assignedTo}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              Créé {getTimeSince(alert.createdDate)} • Dernière
                              mise à jour: {formatDate(alert.lastUpdated)}
                            </small>
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewAlert(alert)}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              {alert.status !== "resolved" && (
                                <div
                                  className="btn-group btn-group-sm"
                                  role="group"
                                >
                                  <button
                                    className="btn btn-outline-warning dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    title="Changer statut"
                                  >
                                    <i className="bi bi-arrow-repeat"></i>
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            alert.id,
                                            "investigating",
                                          )
                                        }
                                      >
                                        <i className="bi bi-search me-2"></i>
                                        En enquête
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            alert.id,
                                            "monitoring",
                                          )
                                        }
                                      >
                                        <i className="bi bi-eye me-2"></i>
                                        Surveillance
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            alert.id,
                                            "resolved",
                                          )
                                        }
                                      >
                                        <i className="bi bi-check-circle me-2"></i>
                                        Résolu
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                              <button
                                className="btn btn-outline-info"
                                title="Générer rapport"
                              >
                                <i className="bi bi-file-text"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredAlerts.length === 0 && !loading && (
            <div className="text-center py-5">
              <i className="bi bi-shield-check display-4 text-muted"></i>
              <h5 className="mt-3">Aucune alerte trouvée</h5>
              <p className="text-muted">
                Aucune alerte ne correspond à vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Alert Details Modal */}
      {showModal && selectedAlert && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i
                    className={`bi ${getTypeIcon(selectedAlert.type)} me-2`}
                  ></i>
                  Détails de l'Alerte
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-12">
                    <h6>{selectedAlert.title}</h6>
                    <div className="d-flex gap-2 mb-3">
                      <span
                        className={
                          getPriorityBadge(selectedAlert.priority).class
                        }
                      >
                        {getPriorityBadge(selectedAlert.priority).text}
                      </span>
                      <span
                        className={getStatusBadge(selectedAlert.status).class}
                      >
                        {getStatusBadge(selectedAlert.status).text}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h6>Informations générales</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Entité cible:</strong>
                          </td>
                          <td>{selectedAlert.targetEntity}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Localisation:</strong>
                          </td>
                          <td>{selectedAlert.location}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Type:</strong>
                          </td>
                          <td>{selectedAlert.type}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Niveau de risque:</strong>
                          </td>
                          <td
                            className={
                              getRiskBadge(selectedAlert.riskLevel).class
                            }
                          >
                            <i
                              className={`${getRiskBadge(selectedAlert.riskLevel).icon} me-1`}
                            ></i>
                            {getRiskBadge(selectedAlert.riskLevel).text}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Assigné à:</strong>
                          </td>
                          <td>{selectedAlert.assignedTo}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Dates</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Créé le:</strong>
                          </td>
                          <td>{formatDate(selectedAlert.createdDate)}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Dernière MAJ:</strong>
                          </td>
                          <td>{formatDate(selectedAlert.lastUpdated)}</td>
                        </tr>
                        {selectedAlert.resolutionDate && (
                          <tr>
                            <td>
                              <strong>Résolu le:</strong>
                            </td>
                            <td>{formatDate(selectedAlert.resolutionDate)}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-12 mb-3">
                    <h6>Description</h6>
                    <p>{selectedAlert.description}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <h6>Action requise</h6>
                    <p>{selectedAlert.actionRequired}</p>
                  </div>
                </div>

                {selectedAlert.evidence &&
                  selectedAlert.evidence.length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <h6>Preuves</h6>
                        <ul className="list-group list-group-flush">
                          {selectedAlert.evidence.map((evidence, index) => (
                            <li
                              key={`evidence-${selectedAlert.id}-${index}`}
                              className="list-group-item"
                            >
                              <i className="bi bi-file-earmark me-2"></i>
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                {selectedAlert.notes && (
                  <div className="row mt-3">
                    <div className="col-12">
                      <h6>Notes</h6>
                      <p className="text-muted">{selectedAlert.notes}</p>
                    </div>
                  </div>
                )}

                {selectedAlert.resolution && (
                  <div className="row mt-3">
                    <div className="col-12">
                      <h6>Résolution</h6>
                      <div className="alert alert-success">
                        <i className="bi bi-check-circle me-2"></i>
                        {selectedAlert.resolution}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
                {selectedAlert.status !== "resolved" && (
                  <>
                    <button type="button" className="btn btn-warning">
                      <i className="bi bi-search me-1"></i>
                      Enquêter
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        handleStatusUpdate(selectedAlert.id, "resolved");
                        setShowModal(false);
                      }}
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Marquer Résolu
                    </button>
                  </>
                )}
                <button type="button" className="btn btn-primary">
                  <i className="bi bi-file-text me-1"></i>
                  Générer Rapport
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-plus me-2"></i>
                  Nouvelle Alerte
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="newAlertTitle" className="form-label">
                      Titre
                    </label>
                    <input
                      id="newAlertTitle"
                      type="text"
                      className="form-control"
                      value={newAlert.title}
                      onChange={(e) =>
                        setNewAlert({ ...newAlert, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newAlert.description}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description détaillée de l'alerte"
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="newAlertType" className="form-label">
                        Type
                      </label>
                      <select
                        id="newAlertType"
                        className="form-select"
                        value={newAlert.type}
                        onChange={(e) =>
                          setNewAlert({ ...newAlert, type: e.target.value })
                        }
                      >
                        <option value="system">Système</option>
                        <option value="correspondence">Correspondance</option>
                        <option value="financial">Financier</option>
                        <option value="security">Sécurité</option>
                        <option value="medical">Médical</option>
                        <option value="behavioral">Comportemental</option>
                        <option value="absence">Absence</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="newAlertPriority" className="form-label">
                        Priorité
                      </label>
                      <select
                        id="newAlertPriority"
                        className="form-select"
                        value={newAlert.priority}
                        onChange={(e) =>
                          setNewAlert({ ...newAlert, priority: e.target.value })
                        }
                      >
                        <option value="low">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="high">Élevé</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critique</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newAlertAction" className="form-label">
                      Action Requise
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newAlert.targetEntity}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          targetEntity: e.target.value,
                        })
                      }
                      placeholder="Association ou pensionnaire concerné"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newAlertTarget" className="form-label">
                      Entité Cible
                    </label>
                    <textarea
                      id="newAlertAction"
                      className="form-control"
                      rows="3"
                      value={newAlert.actionRequired}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          actionRequired: e.target.value,
                        })
                      }
                      placeholder="Décrivez l'action à entreprendre"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateAlert}
                  disabled={
                    !newAlert.title ||
                    !newAlert.description ||
                    !newAlert.targetEntity
                  }
                >
                  <i className="bi bi-plus me-1"></i>
                  Créer Alerte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCreateModal && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default AlertsManagement;
