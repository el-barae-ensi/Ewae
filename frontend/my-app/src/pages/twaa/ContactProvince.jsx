import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ContactProvince = () => {
  const { user } = useAuth();
  const [provinces, setProvinces] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [filteredCommunications, setFilteredCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newMessage, setNewMessage] = useState({
    province: "",
    subject: "",
    message: "",
    priority: "medium",
    category: "general",
  });

  // Mock data for provinces
  const mockProvinces = [
    {
      id: 1,
      name: "Rabat-Salé-Kénitra",
      code: "RSK",
      governor: "M. Ahmed Benali",
      contact: "+212 537 123 456",
    },
    {
      id: 2,
      name: "Casablanca-Settat",
      code: "CS",
      governor: "Mme. Fatima Zahra",
      contact: "+212 522 987 654",
    },
    {
      id: 3,
      name: "Fès-Meknès",
      code: "FM",
      governor: "M. Hassan Alami",
      contact: "+212 535 456 789",
    },
    {
      id: 4,
      name: "Tanger-Tétouan-Al Hoceïma",
      code: "TTAH",
      governor: "M. Omar Benjelloun",
      contact: "+212 539 321 654",
    },
    {
      id: 5,
      name: "Marrakech-Safi",
      code: "MS",
      governor: "Mme. Aicha Moussaoui",
      contact: "+212 524 789 123",
    },
    {
      id: 6,
      name: "Oriental",
      code: "OR",
      governor: "M. Youssef Karimi",
      contact: "+212 536 654 987",
    },
    {
      id: 7,
      name: "Souss-Massa",
      code: "SM",
      governor: "M. Rachid Bennani",
      contact: "+212 528 147 258",
    },
    {
      id: 8,
      name: "Drâa-Tafilalet",
      code: "DT",
      governor: "M. Abdellah Radi",
      contact: "+212 535 369 852",
    },
  ];

  // Mock data for communications
  useEffect(() => {
    const mockCommunications = [
      {
        id: 1,
        province: "Rabat-Salé-Kénitra",
        subject: "Rapport mensuel des activités pénitentiaires",
        message:
          "Veuillez trouver ci-joint le rapport mensuel des activités de la prison centrale de Rabat pour le mois de décembre 2024.",
        priority: "medium",
        status: "sent",
        category: "report",
        timestamp: "2024-12-28T09:30:00Z",
        direction: "outgoing",
        attachments: ["rapport_dec_2024.pdf", "statistiques.xlsx"],
        responseRequired: true,
        deadline: "2025-01-05",
        sender: "Direction Prison Centrale Rabat",
        recipient: "Gouverneur RSK",
      },
      {
        id: 2,
        province: "Casablanca-Settat",
        subject: "Demande d'augmentation du budget de sécurité",
        message:
          "Suite aux récents incidents, nous sollicitons une augmentation du budget alloué à la sécurité de 25%.",
        priority: "high",
        status: "pending_response",
        category: "budget",
        timestamp: "2024-12-27T14:15:00Z",
        direction: "outgoing",
        attachments: ["budget_proposal.pdf"],
        responseRequired: true,
        deadline: "2024-12-30",
        sender: "Direction Prison Locale Casa",
        recipient: "Gouverneur CS",
      },
      {
        id: 3,
        province: "Fès-Meknès",
        subject: "Coordination pour transfert de détenus",
        message:
          "Nous accusons réception de votre demande de coordination pour le transfert de 15 détenus vers notre établissement.",
        priority: "medium",
        status: "received",
        category: "transfer",
        timestamp: "2024-12-27T11:45:00Z",
        direction: "incoming",
        attachments: ["liste_detenus.pdf"],
        responseRequired: false,
        deadline: null,
        sender: "Gouverneur FM",
        recipient: "Direction Twaa",
      },
      {
        id: 4,
        province: "Tanger-Tétouan-Al Hoceïma",
        subject: "Alerte sécuritaire - Mesures préventives",
        message:
          "Information urgente concernant des menaces de sécurité potentielles. Activation du protocole d'urgence requis.",
        priority: "high",
        status: "received",
        category: "security",
        timestamp: "2024-12-26T16:20:00Z",
        direction: "incoming",
        attachments: ["protocole_urgence.pdf"],
        responseRequired: true,
        deadline: "2024-12-28",
        sender: "Gouverneur TTAH",
        recipient: "Direction Twaa",
      },
      {
        id: 5,
        province: "Marrakech-Safi",
        subject: "Approbation projet de réhabilitation",
        message:
          "Votre projet de réhabilitation de l'aile ouest a été approuvé. Budget alloué: 2.5 millions DH.",
        priority: "medium",
        status: "received",
        category: "infrastructure",
        timestamp: "2024-12-25T10:30:00Z",
        direction: "incoming",
        attachments: ["approbation_projet.pdf", "budget_allocation.pdf"],
        responseRequired: false,
        deadline: null,
        sender: "Gouverneur MS",
        recipient: "Direction Prison Marrakech",
      },
      {
        id: 6,
        province: "Oriental",
        subject: "Formation du personnel pénitentiaire",
        message:
          "Organisation d'une session de formation sur les droits de l'homme pour le personnel pénitentiaire.",
        priority: "low",
        status: "draft",
        category: "training",
        timestamp: "2024-12-24T13:45:00Z",
        direction: "outgoing",
        attachments: ["programme_formation.pdf"],
        responseRequired: true,
        deadline: "2025-01-10",
        sender: "Direction Twaa",
        recipient: "Gouverneur OR",
      },
    ];

    setTimeout(() => {
      setProvinces(mockProvinces);
      setCommunications(mockCommunications);
      setFilteredCommunications(mockCommunications);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter communications based on search and filters
  useEffect(() => {
    let filtered = communications.filter((comm) => {
      const matchesSearch =
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.sender.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProvince =
        provinceFilter === "all" || comm.province === provinceFilter;
      const matchesStatus =
        statusFilter === "all" || comm.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || comm.priority === priorityFilter;

      return (
        matchesSearch && matchesProvince && matchesStatus && matchesPriority
      );
    });

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredCommunications(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    provinceFilter,
    statusFilter,
    priorityFilter,
    communications,
  ]);

  const handleViewDetails = (communication) => {
    setSelectedCommunication(communication);
    setShowModal(true);
  };

  const handleNewMessage = () => {
    setNewMessage({
      province: "",
      subject: "",
      message: "",
      priority: "medium",
      category: "general",
    });
    setShowNewMessageModal(true);
  };

  const handleSendMessage = () => {
    const newComm = {
      id: communications.length + 1,
      province: newMessage.province,
      subject: newMessage.subject,
      message: newMessage.message,
      priority: newMessage.priority,
      status: "sent",
      category: newMessage.category,
      timestamp: new Date().toISOString(),
      direction: "outgoing",
      attachments: [],
      responseRequired: true,
      deadline: null,
      sender: "Direction Twaa",
      recipient: `Gouverneur ${newMessage.province}`,
    };

    setCommunications([newComm, ...communications]);
    setShowNewMessageModal(false);
    alert("Message envoyé avec succès");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      sent: { color: "success", text: "Envoyé" },
      received: { color: "info", text: "Reçu" },
      pending_response: { color: "warning", text: "En attente" },
      draft: { color: "secondary", text: "Brouillon" },
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

  const getCategoryIcon = (category) => {
    const categoryConfig = {
      report: "bi-file-earmark-text",
      budget: "bi-cash-coin",
      transfer: "bi-arrow-left-right",
      security: "bi-shield-exclamation",
      infrastructure: "bi-building",
      training: "bi-mortarboard",
      general: "bi-chat-dots",
    };

    return categoryConfig[category] || "bi-envelope";
  };

  const getDirectionIcon = (direction) => {
    return direction === "incoming"
      ? "bi-arrow-down-left"
      : "bi-arrow-up-right";
  };

  const getDirectionColor = (direction) => {
    return direction === "incoming" ? "success" : "primary";
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("fr-FR");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCommunications.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCommunications.length / itemsPerPage);

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
              <h2 className="mb-1">Contact Province</h2>
              <p className="text-muted">
                Gérer les communications avec les gouvernorats provinciaux
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer me-2"></i>Imprimer
              </button>
              <button className="btn btn-primary" onClick={handleNewMessage}>
                <i className="bi bi-plus-lg me-2"></i>Nouveau Message
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
                      <h6 className="card-title mb-0">Total Communications</h6>
                      <h3 className="mb-0">{communications.length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-chat-dots-fill"
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
                      <h6 className="card-title mb-0">Envoyés</h6>
                      <h3 className="mb-0">
                        {
                          communications.filter(
                            (c) => c.direction === "outgoing",
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-arrow-up-right-circle"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title mb-0">Reçus</h6>
                      <h3 className="mb-0">
                        {
                          communications.filter(
                            (c) => c.direction === "incoming",
                          ).length
                        }
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="bi bi-arrow-down-left-circle"
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
                      <h6 className="card-title mb-0">En attente</h6>
                      <h3 className="mb-0">
                        {
                          communications.filter(
                            (c) => c.status === "pending_response",
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
          </div>

          {/* Province Quick Contacts */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Contacts Provinciaux</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {provinces.slice(0, 4).map((province) => (
                  <div key={province.id} className="col-md-3 mb-3">
                    <div className="d-flex align-items-center p-2 border rounded">
                      <div className="me-3">
                        <i
                          className="bi bi-geo-alt-fill text-primary"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{province.code}</h6>
                        <small className="text-muted d-block">
                          {province.governor}
                        </small>
                        <small className="text-muted">{province.contact}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setNewMessage({
                            ...newMessage,
                            province: province.name,
                          });
                          setShowNewMessageModal(true);
                        }}
                      >
                        <i className="bi bi-chat"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                      placeholder="Sujet, message, province..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="provinceFilter" className="form-label">
                    Province
                  </label>
                  <select
                    className="form-select"
                    id="provinceFilter"
                    value={provinceFilter}
                    onChange={(e) => setProvinceFilter(e.target.value)}
                  >
                    <option value="all">Toutes les provinces</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
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
                    <option value="sent">Envoyé</option>
                    <option value="received">Reçu</option>
                    <option value="pending_response">En attente</option>
                    <option value="draft">Brouillon</option>
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
                <div className="col-md-3 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setProvinceFilter("all");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Communications List */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Direction</th>
                      <th>Province</th>
                      <th>Sujet</th>
                      <th>Catégorie</th>
                      <th>Priorité</th>
                      <th>Statut</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((comm) => (
                      <tr key={comm.id}>
                        <td>
                          <i
                            className={`bi ${getDirectionIcon(comm.direction)} text-${getDirectionColor(comm.direction)}`}
                          ></i>
                        </td>
                        <td>
                          <div>
                            <strong>
                              {provinces.find((p) => p.name === comm.province)
                                ?.code || comm.province}
                            </strong>
                            <br />
                            <small className="text-muted">
                              {comm.province}
                            </small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong>{comm.subject}</strong>
                            <br />
                            <small className="text-muted">
                              {comm.message.length > 50
                                ? `${comm.message.substring(0, 50)}...`
                                : comm.message}
                            </small>
                          </div>
                        </td>
                        <td>
                          <i
                            className={`bi ${getCategoryIcon(comm.category)} me-2`}
                          ></i>
                          {comm.category}
                        </td>
                        <td>{getPriorityBadge(comm.priority)}</td>
                        <td>{getStatusBadge(comm.status)}</td>
                        <td>
                          <small>{formatTimestamp(comm.timestamp)}</small>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => handleViewDetails(comm)}
                              title="Voir détails"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Répondre"
                            >
                              <i className="bi bi-reply"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredCommunications.length === 0 && (
                  <div className="text-center py-4">
                    <i
                      className="bi bi-inbox"
                      style={{ fontSize: "3rem", color: "#ccc" }}
                    ></i>
                    <p className="text-muted mt-2">
                      Aucune communication trouvée
                    </p>
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
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedCommunication && (
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
                    className={`bi ${getCategoryIcon(selectedCommunication.category)} me-2`}
                  ></i>
                  {selectedCommunication.subject}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Province:</strong> {selectedCommunication.province}
                  </div>
                  <div className="col-md-6">
                    <strong>Direction:</strong>
                    <i
                      className={`bi ${getDirectionIcon(selectedCommunication.direction)} text-${getDirectionColor(selectedCommunication.direction)} ms-2`}
                    ></i>
                    {selectedCommunication.direction === "incoming"
                      ? "Reçu"
                      : "Envoyé"}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <strong>Priorité:</strong>{" "}
                    {getPriorityBadge(selectedCommunication.priority)}
                  </div>
                  <div className="col-md-4">
                    <strong>Statut:</strong>{" "}
                    {getStatusBadge(selectedCommunication.status)}
                  </div>
                  <div className="col-md-4">
                    <strong>Catégorie:</strong> {selectedCommunication.category}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Expéditeur:</strong> {selectedCommunication.sender}
                  </div>
                  <div className="col-md-6">
                    <strong>Destinataire:</strong>{" "}
                    {selectedCommunication.recipient}
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Date:</strong>{" "}
                  {formatTimestamp(selectedCommunication.timestamp)}
                </div>

                {selectedCommunication.deadline && (
                  <div className="mb-3">
                    <strong>Échéance:</strong>
                    <span className="text-warning ms-2">
                      {new Date(
                        selectedCommunication.deadline,
                      ).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <strong>Message:</strong>
                  <div className="mt-2 p-3 bg-light rounded">
                    {selectedCommunication.message}
                  </div>
                </div>

                {selectedCommunication.attachments &&
                  selectedCommunication.attachments.length > 0 && (
                    <div className="mb-3">
                      <strong>Pièces jointes:</strong>
                      <div className="mt-2">
                        {selectedCommunication.attachments.map(
                          (attachment, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center mb-2"
                            >
                              <i className="bi bi-paperclip me-2"></i>
                              <span>{attachment}</span>
                              <button className="btn btn-sm btn-outline-primary ms-2">
                                <i className="bi bi-download"></i>
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary">
                  <i className="bi bi-reply me-2"></i>Répondre
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  <i className="bi bi-forward me-2"></i>Transférer
                </button>
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

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nouveau Message</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowNewMessageModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="province" className="form-label">
                      Province *
                    </label>
                    <select
                      className="form-select"
                      id="province"
                      value={newMessage.province}
                      onChange={(e) =>
                        setNewMessage({
                          ...newMessage,
                          province: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Sélectionner une province</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="priority" className="form-label">
                      Priorité
                    </label>
                    <select
                      className="form-select"
                      id="priority"
                      value={newMessage.priority}
                      onChange={(e) =>
                        setNewMessage({
                          ...newMessage,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">
                      Catégorie
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      value={newMessage.category}
                      onChange={(e) =>
                        setNewMessage({
                          ...newMessage,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="general">Général</option>
                      <option value="report">Rapport</option>
                      <option value="budget">Budget</option>
                      <option value="security">Sécurité</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="training">Formation</option>
                      <option value="transfer">Transfert</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    value={newMessage.subject}
                    onChange={(e) =>
                      setNewMessage({ ...newMessage, subject: e.target.value })
                    }
                    placeholder="Entrer le sujet du message"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="6"
                    value={newMessage.message}
                    onChange={(e) =>
                      setNewMessage({ ...newMessage, message: e.target.value })
                    }
                    placeholder="Entrer le contenu du message"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="attachment" className="form-label">
                    Pièces jointes
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="attachment"
                    multiple
                  />
                  <div className="form-text">
                    Vous pouvez joindre plusieurs fichiers
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowNewMessageModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    // Save as draft logic
                    alert("Message sauvegardé en brouillon");
                    setShowNewMessageModal(false);
                  }}
                >
                  Sauvegarder en brouillon
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendMessage}
                  disabled={
                    !newMessage.province ||
                    !newMessage.subject ||
                    !newMessage.message
                  }
                >
                  <i className="bi bi-send me-2"></i>Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactProvince;
