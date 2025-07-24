import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const PoliceModule = () => {
  const { user } = useAuth();
  const [policeUnits, setPoliceUnits] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("incidents");
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    priority: "medium",
    facility: "",
    policeUnit: "",
    type: "security",
  });

  // Mock data for police units
  const mockPoliceUnits = [
    {
      id: 1,
      name: "Brigade Anti-Criminalité Rabat",
      code: "BAC-RBT",
      commander: "Commissaire Ahmed Bennani",
      contact: "+212 537 765 432",
      specialization: "Criminalité organisée",
      status: "active",
      personnel: 45,
      vehicles: 8,
      lastIntervention: "2024-12-27T14:30:00Z",
    },
    {
      id: 2,
      name: "Police Judiciaire Casablanca",
      code: "PJ-CASA",
      commander: "Commissaire Fatima Alami",
      contact: "+212 522 876 543",
      specialization: "Enquêtes criminelles",
      status: "active",
      personnel: 62,
      vehicles: 12,
      lastIntervention: "2024-12-28T09:15:00Z",
    },
    {
      id: 3,
      name: "Unité Spéciale Fès",
      code: "US-FES",
      commander: "Commissaire Hassan Moussaoui",
      contact: "+212 535 987 654",
      specialization: "Intervention rapide",
      status: "active",
      personnel: 38,
      vehicles: 6,
      lastIntervention: "2024-12-26T16:45:00Z",
    },
    {
      id: 4,
      name: "Brigade Mobile Tanger",
      code: "BM-TNG",
      commander: "Commissaire Youssef Karimi",
      contact: "+212 539 456 789",
      specialization: "Patrouilles mobiles",
      status: "standby",
      personnel: 28,
      vehicles: 5,
      lastIntervention: "2024-12-25T11:20:00Z",
    },
    {
      id: 5,
      name: "Police Pénitentiaire Spécialisée",
      code: "PPS-NAT",
      commander: "Commissaire Aicha Radi",
      contact: "+212 537 321 987",
      specialization: "Sécurité pénitentiaire",
      status: "active",
      personnel: 85,
      vehicles: 15,
      lastIntervention: "2024-12-28T07:30:00Z",
    },
  ];

  // Mock data for incidents
  useEffect(() => {
    const mockIncidents = [
      {
        id: 1,
        title: "Tentative d'évasion - Prison Centrale Rabat",
        description:
          "Tentative d'évasion détectée dans le bloc B. 3 détenus impliqués. Situation maîtrisée par l'équipe de sécurité.",
        priority: "high",
        status: "resolved",
        type: "security",
        facility: "Prison Centrale Rabat",
        policeUnit: "Brigade Anti-Criminalité Rabat",
        reportedBy: "Chef de Sécurité Mourad El Fassi",
        timestamp: "2024-12-28T06:30:00Z",
        resolvedAt: "2024-12-28T08:45:00Z",
        responseTime: "2h 15min",
        involvedPersons: ["Ahmed Ben Ali", "Mohamed Tazi", "Youssef Amrani"],
        evidenceCollected: [
          "Outils de fortune",
          "Plans des couloirs",
          "Téléphone clandestin",
        ],
        actions: [
          "Interrogatoires",
          "Transfert vers isolement",
          "Enquête approfondie",
        ],
      },
      {
        id: 2,
        title: "Bagarre entre détenus - Prison Locale Casa",
        description:
          "Altercation violente dans la cour de promenade. 2 blessés légers transportés à l'infirmerie.",
        priority: "medium",
        status: "in_progress",
        type: "violence",
        facility: "Prison Locale Casa",
        policeUnit: "Police Judiciaire Casablanca",
        reportedBy: "Surveillant Chef Karim Benali",
        timestamp: "2024-12-27T15:20:00Z",
        responseTime: "En cours",
        involvedPersons: ["Rachid Mansouri", "Abdellah Ziani"],
        evidenceCollected: [],
        actions: [
          "Séparation des impliqués",
          "Soins médicaux",
          "Rapport en cours",
        ],
      },
      {
        id: 3,
        title: "Découverte de substances illicites - Prison Fès",
        description:
          "Découverte de drogue lors d'une fouille de routine. Quantité importante saisie.",
        priority: "high",
        status: "under_investigation",
        type: "contraband",
        facility: "Prison Centrale Fès",
        policeUnit: "Unité Spéciale Fès",
        reportedBy: "Directeur Adjoint Nizar Benjelloun",
        timestamp: "2024-12-27T10:15:00Z",
        responseTime: "En cours",
        involvedPersons: ["Suspect non identifié"],
        evidenceCollected: [
          "Cannabis (250g)",
          "Balance de précision",
          "Sachets plastiques",
        ],
        actions: [
          "Analyse forensique",
          "Enquête sur la provenance",
          "Interrogatoires",
        ],
      },
      {
        id: 4,
        title: "Incident médical grave - Prison Tanger",
        description:
          "Détenu en détresse respiratoire. Intervention d'urgence requise.",
        priority: "high",
        status: "resolved",
        type: "medical",
        facility: "Prison Locale Tanger",
        policeUnit: "Brigade Mobile Tanger",
        reportedBy: "Infirmier Chef Samir Alaoui",
        timestamp: "2024-12-26T20:45:00Z",
        resolvedAt: "2024-12-26T21:30:00Z",
        responseTime: "45min",
        involvedPersons: ["Omar Lakhal"],
        evidenceCollected: [],
        actions: [
          "Transport d'urgence à l'hôpital",
          "Stabilisation",
          "Suivi médical",
        ],
      },
      {
        id: 5,
        title: "Menaces contre le personnel - Prison Meknès",
        description:
          "Menaces proférées par un détenu contre un surveillant. Situation tendue.",
        priority: "medium",
        status: "pending",
        type: "threat",
        facility: "Prison Centrale Meknès",
        policeUnit: "Police Pénitentiaire Spécialisée",
        reportedBy: "Surveillant Khalid Tounsi",
        timestamp: "2024-12-25T13:00:00Z",
        responseTime: "En attente",
        involvedPersons: ["Hassan Mernissi"],
        evidenceCollected: ["Témoignages", "Enregistrement audio"],
        actions: ["Évaluation psychologique", "Mesures de protection"],
      },
      {
        id: 6,
        title: "Visite suspecte détectée - Prison Salé",
        description:
          "Comportement suspect d'un visiteur lors des contrôles de sécurité.",
        priority: "medium",
        status: "resolved",
        type: "security",
        facility: "Prison Locale Salé",
        policeUnit: "Brigade Anti-Criminalité Rabat",
        reportedBy: "Agent de Sécurité Mustapha Idrissi",
        timestamp: "2024-12-24T14:30:00Z",
        resolvedAt: "2024-12-24T16:00:00Z",
        responseTime: "1h 30min",
        involvedPersons: ["Laila Benkirane (visiteur)"],
        evidenceCollected: [
          "Objet métallique non autorisé",
          "Documents suspects",
        ],
        actions: [
          "Fouille approfondie",
          "Vérification d'identité",
          "Interdiction de visite",
        ],
      },
    ];

    setTimeout(() => {
      setPoliceUnits(mockPoliceUnits);
      setIncidents(mockIncidents);
      setFilteredIncidents(mockIncidents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter incidents based on search and filters
  useEffect(() => {
    let filtered = incidents.filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || incident.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || incident.priority === priorityFilter;
      const matchesUnit =
        unitFilter === "all" || incident.policeUnit === unitFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesUnit;
    });

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredIncidents(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter, unitFilter, incidents]);

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const handleNewIncident = () => {
    setNewIncident({
      title: "",
      description: "",
      priority: "medium",
      facility: "",
      policeUnit: "",
      type: "security",
    });
    setShowNewIncidentModal(true);
  };

  const handleReportIncident = () => {
    const newInc = {
      id: incidents.length + 1,
      ...newIncident,
      status: "pending",
      reportedBy: user.name,
      timestamp: new Date().toISOString(),
      responseTime: "En attente",
      involvedPersons: [],
      evidenceCollected: [],
      actions: [],
    };

    setIncidents([newInc, ...incidents]);
    setShowNewIncidentModal(false);
    alert("Incident signalé avec succès");
  };

  const updateIncidentStatus = (incidentId, newStatus) => {
    const updatedIncidents = incidents.map((incident) =>
      incident.id === incidentId
        ? {
            ...incident,
            status: newStatus,
            resolvedAt:
              newStatus === "resolved"
                ? new Date().toISOString()
                : incident.resolvedAt,
          }
        : incident,
    );
    setIncidents(updatedIncidents);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "warning", text: "En attente" },
      in_progress: { color: "info", text: "En cours" },
      under_investigation: { color: "primary", text: "Enquête" },
      resolved: { color: "success", text: "Résolu" },
      closed: { color: "secondary", text: "Fermé" },
    };

    const config = statusConfig[status] || { color: "secondary", text: status };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "danger", text: "Haute" },
      medium: { color: "warning", text: "Moyenne" },
      low: { color: "success", text: "Basse" },
    };

    const config = priorityConfig[priority] || {
      color: "secondary",
      text: priority,
    };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const getTypeIcon = (type) => {
    const typeConfig = {
      security: "bi-shield-exclamation",
      violence: "bi-person-x",
      contraband: "bi-box-seam",
      medical: "bi-heart-pulse",
      threat: "bi-exclamation-triangle",
      escape: "bi-door-open",
    };

    return typeConfig[type] || "bi-exclamation-circle";
  };

  const getUnitStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "success", text: "Actif" },
      standby: { color: "warning", text: "En attente" },
      offline: { color: "secondary", text: "Hors ligne" },
    };

    const config = statusConfig[status] || { color: "secondary", text: status };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("fr-FR");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIncidents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage);

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
              <h2 className="mb-1">Module Police</h2>
              <p className="text-muted">
                Coordination avec les forces de police et gestion des incidents
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger"
                onClick={() => alert("Alerte d'urgence activée")}
              >
                <i className="bi bi-exclamation-triangle me-2"></i>Alerte
                d'Urgence
              </button>
              <button className="btn btn-primary" onClick={handleNewIncident}>
                <i className="bi bi-plus-lg me-2"></i>Signaler Incident
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title mb-0">Total Incidents</h6>
                      <h3 className="mb-0">{incidents.length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-exclamation-circle-fill"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title mb-0">En cours</h6>
                      <h3 className="mb-0">
                        {
                          incidents.filter((i) =>
                            [
                              "pending",
                              "in_progress",
                              "under_investigation",
                            ].includes(i.status),
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-clock-fill"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title mb-0">Haute Priorité</h6>
                      <h3 className="mb-0">
                        {incidents.filter((i) => i.priority === "high").length}
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-exclamation-triangle-fill"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title mb-0">Unités Actives</h6>
                      <h3 className="mb-0">
                        {
                          policeUnits.filter((u) => u.status === "active")
                            .length
                        }
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-shield-fill"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card mb-4">
            <div className="card-header p-0">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "incidents" ? "active" : ""}`}
                    onClick={() => setActiveTab("incidents")}
                  >
                    <i className="bi bi-exclamation-circle me-2"></i>Incidents
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "units" ? "active" : ""}`}
                    onClick={() => setActiveTab("units")}
                  >
                    <i className="bi bi-shield me-2"></i>Unités Police
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "emergency" ? "active" : ""}`}
                    onClick={() => setActiveTab("emergency")}
                  >
                    <i className="bi bi-telephone-forward me-2"></i>Contacts
                    d'Urgence
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Incidents Tab */}
          {activeTab === "incidents" && (
            <>
              {/* Filters */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="search" className="form-label">
                        Rechercher
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="search"
                          placeholder="Titre, description, établissement..."
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
                        className="form-select"
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="in_progress">En cours</option>
                        <option value="under_investigation">Enquête</option>
                        <option value="resolved">Résolu</option>
                        <option value="closed">Fermé</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="priorityFilter" className="form-label">
                        Priorité
                      </label>
                      <select
                        className="form-select"
                        id="priorityFilter"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                      >
                        <option value="all">Toutes priorités</option>
                        <option value="high">Haute</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Basse</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="unitFilter" className="form-label">
                        Unité Police
                      </label>
                      <select
                        className="form-select"
                        id="unitFilter"
                        value={unitFilter}
                        onChange={(e) => setUnitFilter(e.target.value)}
                      >
                        <option value="all">Toutes les unités</option>
                        {policeUnits.map((unit) => (
                          <option key={unit.id} value={unit.name}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("all");
                          setPriorityFilter("all");
                          setUnitFilter("all");
                        }}
                      >
                        <i className="bi bi-arrow-clockwise me-1"></i>
                        Réinitialiser
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incidents Table */}
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Type</th>
                          <th>Incident</th>
                          <th>Établissement</th>
                          <th>Priorité</th>
                          <th>Statut</th>
                          <th>Unité Assignée</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((incident) => (
                          <tr key={incident.id}>
                            <td>
                              <i
                                className={`bi ${getTypeIcon(incident.type)} text-secondary`}
                              ></i>
                            </td>
                            <td>
                              <div>
                                <strong>{incident.title}</strong>
                                <br />
                                <small className="text-muted">
                                  {incident.description.length > 60
                                    ? `${incident.description.substring(0, 60)}...`
                                    : incident.description}
                                </small>
                              </div>
                            </td>
                            <td>
                              <small className="text-muted">
                                {incident.facility}
                              </small>
                            </td>
                            <td>{getPriorityBadge(incident.priority)}</td>
                            <td>{getStatusBadge(incident.status)}</td>
                            <td>
                              <small>{incident.policeUnit}</small>
                            </td>
                            <td>
                              <small>
                                {formatTimestamp(incident.timestamp)}
                              </small>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  onClick={() => handleViewDetails(incident)}
                                  title="Voir détails"
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                {incident.status !== "resolved" &&
                                  incident.status !== "closed" && (
                                    <button
                                      className="btn btn-sm btn-outline-success"
                                      onClick={() =>
                                        updateIncidentStatus(
                                          incident.id,
                                          "resolved",
                                        )
                                      }
                                      title="Marquer comme résolu"
                                    >
                                      <i className="bi bi-check"></i>
                                    </button>
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredIncidents.length === 0 && (
                      <div className="text-center py-4">
                        <i
                          className="bi bi-inbox"
                          style={{ fontSize: "3rem", color: "#ccc" }}
                        ></i>
                        <p className="text-muted mt-2">Aucun incident trouvé</p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav aria-label="Navigation des pages" className="mt-4">
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Précédent
                          </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Suivant
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Police Units Tab */}
          {activeTab === "units" && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {policeUnits.map((unit) => (
                    <div key={unit.id} className="col-md-6 mb-4">
                      <div className="card border">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="card-title mb-1">{unit.name}</h5>
                              <p className="text-muted mb-0">{unit.code}</p>
                            </div>
                            <div>{getUnitStatusBadge(unit.status)}</div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-6">
                              <strong>Commandant:</strong>
                              <br />
                              <small>{unit.commander}</small>
                            </div>
                            <div className="col-6">
                              <strong>Contact:</strong>
                              <br />
                              <small>{unit.contact}</small>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-12">
                              <strong>Spécialisation:</strong>
                              <br />
                              <small>{unit.specialization}</small>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-4">
                              <strong>Personnel:</strong>
                              <br />
                              <span className="badge bg-info">
                                {unit.personnel}
                              </span>
                            </div>
                            <div className="col-4">
                              <strong>Véhicules:</strong>
                              <br />
                              <span className="badge bg-secondary">
                                {unit.vehicles}
                              </span>
                            </div>
                            <div className="col-4">
                              <strong>Statut:</strong>
                              <br />
                              {getUnitStatusBadge(unit.status)}
                            </div>
                          </div>

                          <div className="mb-3">
                            <strong>Dernière intervention:</strong>
                            <br />
                            <small className="text-muted">
                              {formatTimestamp(unit.lastIntervention)}
                            </small>
                          </div>

                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-telephone me-1"></i>Contacter
                            </button>
                            <button className="btn btn-sm btn-outline-info">
                              <i className="bi bi-info-circle me-1"></i>Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contacts Tab */}
          {activeTab === "emergency" && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Contacts d'Urgence Police</h5>
                    <div className="list-group">
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">
                              Centre de Commandement National
                            </h6>
                            <p className="mb-1">
                              Coordination générale des opérations
                            </p>
                            <small>24/7 - Urgences majeures</small>
                          </div>
                          <div>
                            <strong className="text-danger">190</strong>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Police Judiciaire</h6>
                            <p className="mb-1">
                              Enquêtes criminelles spécialisées
                            </p>
                            <small>Heures ouvrables</small>
                          </div>
                          <div>
                            <strong>+212 537 123 190</strong>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Brigade Anti-Criminalité</h6>
                            <p className="mb-1">Interventions rapides</p>
                            <small>24/7</small>
                          </div>
                          <div>
                            <strong>+212 537 456 190</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5>Contacts d'Urgence Médicaux</h5>
                    <div className="list-group">
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">SAMU</h6>
                            <p className="mb-1">Urgences médicales</p>
                            <small>24/7</small>
                          </div>
                          <div>
                            <strong className="text-danger">141</strong>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Protection Civile</h6>
                            <p className="mb-1">Secours et sauvetage</p>
                            <small>24/7</small>
                          </div>
                          <div>
                            <strong className="text-danger">150</strong>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Centre Anti-Poison</h6>
                            <p className="mb-1">Intoxications</p>
                            <small>24/7</small>
                          </div>
                          <div>
                            <strong>+212 537 686 464</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Incident Detail Modal */}
      {showModal && selectedIncident && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <i
                    className={`bi ${getTypeIcon(selectedIncident.type)} me-2`}
                  ></i>
                  {selectedIncident.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <strong>Priorité:</strong>{" "}
                    {getPriorityBadge(selectedIncident.priority)}
                  </div>
                  <div className="col-md-4">
                    <strong>Statut:</strong>{" "}
                    {getStatusBadge(selectedIncident.status)}
                  </div>
                  <div className="col-md-4">
                    <strong>Type:</strong> {selectedIncident.type}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Établissement:</strong> {selectedIncident.facility}
                  </div>
                  <div className="col-md-6">
                    <strong>Signalé par:</strong> {selectedIncident.reportedBy}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Date de signalement:</strong>
                    <br />
                    <small>{formatTimestamp(selectedIncident.timestamp)}</small>
                  </div>
                  <div className="col-md-6">
                    <strong>Temps de réponse:</strong>
                    <br />
                    <small>{selectedIncident.responseTime}</small>
                  </div>
                </div>

                {selectedIncident.resolvedAt && (
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Date de résolution:</strong>
                      <br />
                      <small>
                        {formatTimestamp(selectedIncident.resolvedAt)}
                      </small>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <strong>Unité police assignée:</strong>
                  <br />
                  <span className="badge bg-primary">
                    {selectedIncident.policeUnit}
                  </span>
                </div>

                <div className="mb-4">
                  <strong>Description:</strong>
                  <div className="mt-2 p-3 bg-light rounded">
                    {selectedIncident.description}
                  </div>
                </div>

                {selectedIncident.involvedPersons &&
                  selectedIncident.involvedPersons.length > 0 && (
                    <div className="mb-3">
                      <strong>Personnes impliquées:</strong>
                      <ul className="mt-2">
                        {selectedIncident.involvedPersons.map(
                          (person, index) => (
                            <li key={index}>{person}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {selectedIncident.evidenceCollected &&
                  selectedIncident.evidenceCollected.length > 0 && (
                    <div className="mb-3">
                      <strong>Preuves collectées:</strong>
                      <ul className="mt-2">
                        {selectedIncident.evidenceCollected.map(
                          (evidence, index) => (
                            <li key={index}>{evidence}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {selectedIncident.actions &&
                  selectedIncident.actions.length > 0 && (
                    <div className="mb-3">
                      <strong>Actions entreprises:</strong>
                      <ul className="mt-2">
                        {selectedIncident.actions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              <div className="modal-footer">
                {selectedIncident.status !== "resolved" &&
                  selectedIncident.status !== "closed" && (
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => {
                        updateIncidentStatus(selectedIncident.id, "resolved");
                        setShowModal(false);
                      }}
                    >
                      Marquer comme résolu
                    </button>
                  )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Incident Modal */}
      {showNewIncidentModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Signaler un Incident</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowNewIncidentModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="incidentTitle" className="form-label">
                      Titre de l'incident *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="incidentTitle"
                      value={newIncident.title}
                      onChange={(e) =>
                        setNewIncident({
                          ...newIncident,
                          title: e.target.value,
                        })
                      }
                      placeholder="Titre court et descriptif"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="incidentType" className="form-label">
                      Type d'incident
                    </label>
                    <select
                      className="form-select"
                      id="incidentType"
                      value={newIncident.type}
                      onChange={(e) =>
                        setNewIncident({ ...newIncident, type: e.target.value })
                      }
                    >
                      <option value="security">Sécurité</option>
                      <option value="violence">Violence</option>
                      <option value="contraband">Contrebande</option>
                      <option value="medical">Médical</option>
                      <option value="threat">Menace</option>
                      <option value="escape">Évasion</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="incidentPriority" className="form-label">
                      Priorité
                    </label>
                    <select
                      className="form-select"
                      id="incidentPriority"
                      value={newIncident.priority}
                      onChange={(e) =>
                        setNewIncident({
                          ...newIncident,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="incidentFacility" className="form-label">
                      Établissement *
                    </label>
                    <select
                      className="form-select"
                      id="incidentFacility"
                      value={newIncident.facility}
                      onChange={(e) =>
                        setNewIncident({
                          ...newIncident,
                          facility: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Sélectionner un établissement</option>
                      <option value="Prison Centrale Rabat">
                        Prison Centrale Rabat
                      </option>
                      <option value="Prison Locale Casa">
                        Prison Locale Casa
                      </option>
                      <option value="Prison Centrale Fès">
                        Prison Centrale Fès
                      </option>
                      <option value="Prison Locale Tanger">
                        Prison Locale Tanger
                      </option>
                      <option value="Prison Centrale Meknès">
                        Prison Centrale Meknès
                      </option>
                      <option value="Prison Locale Salé">
                        Prison Locale Salé
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="incidentPoliceUnit" className="form-label">
                    Unité police à contacter
                  </label>
                  <select
                    className="form-select"
                    id="incidentPoliceUnit"
                    value={newIncident.policeUnit}
                    onChange={(e) =>
                      setNewIncident({
                        ...newIncident,
                        policeUnit: e.target.value,
                      })
                    }
                  >
                    <option value="">Sélectionner une unité</option>
                    {policeUnits.map((unit) => (
                      <option key={unit.id} value={unit.name}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="incidentDescription" className="form-label">
                    Description détaillée *
                  </label>
                  <textarea
                    className="form-control"
                    id="incidentDescription"
                    rows="5"
                    value={newIncident.description}
                    onChange={(e) =>
                      setNewIncident({
                        ...newIncident,
                        description: e.target.value,
                      })
                    }
                    placeholder="Décrire l'incident en détail : circonstances, personnes impliquées, actions immédiates prises..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowNewIncidentModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReportIncident}
                  disabled={
                    !newIncident.title ||
                    !newIncident.description ||
                    !newIncident.facility
                  }
                >
                  <i className="bi bi-exclamation-triangle me-2"></i>Signaler
                  l'Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliceModule;
