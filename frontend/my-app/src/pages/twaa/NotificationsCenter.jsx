import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const NotificationsCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "Alerte de sécurité - Prison Centrale Rabat",
        message: "Incident signalé dans le bloc C. Intervention requise immédiatement.",
        type: "security",
        priority: "high",
        status: "unread",
        timestamp: "2024-12-28T10:30:00Z",
        sender: "Système de Sécurité",
        facility: "Prison Centrale Rabat",
        category: "Alerte",
        actions: ["Voir détails", "Marquer comme traité"],
        relatedData: {
          location: "Bloc C - Cellule 25",
          detaineeInvolved: "Ahmed Ben Ali",
          responseTeam: "Équipe Alpha"
        }
      },
      {
        id: 2,
        title: "Rapport mensuel disponible",
        message: "Le rapport mensuel des statistiques de décembre 2024 est maintenant disponible.",
        type: "report",
        priority: "medium",
        status: "read",
        timestamp: "2024-12-28T09:15:00Z",
        sender: "Système de Rapports",
        facility: "Toutes les prisons",
        category: "Information",
        actions: ["Télécharger rapport", "Partager"],
        relatedData: {
          reportType: "Statistiques mensuelles",
          period: "Décembre 2024",
          size: "2.5 MB"
        }
      },
      {
        id: 3,
        title: "Transfert de détenu programmé",
        message: "Le transfert de Mohamed Alami vers Prison Locale Fès est programmé pour demain.",
        type: "transfer",
        priority: "medium",
        status: "unread",
        timestamp: "2024-12-28T08:45:00Z",
        sender: "Service des Transferts",
        facility: "Prison Locale Casa",
        category: "Opération",
        actions: ["Confirmer transfert", "Modifier planning"],
        relatedData: {
          detainee: "Mohamed Alami",
          from: "Prison Locale Casa",
          to: "Prison Locale Fès",
          date: "2024-12-29",
          escort: "Équipe Bravo"
        }
      },
      {
        id: 4,
        title: "Maintenance programmée",
        message: "Maintenance du système informatique prévue ce weekend. Durée estimée: 4 heures.",
        type: "maintenance",
        priority: "low",
        status: "read",
        timestamp: "2024-12-27T16:20:00Z",
        sender: "Service IT",
        facility: "Toutes les prisons",
        category: "Technique",
        actions: ["Voir planning", "Préparer équipes"],
        relatedData: {
          startTime: "2024-12-29T02:00:00Z",
          duration: "4 heures",
          affectedSystems: "Base de données, Interface web",
          technician: "Hassan Benali"
        }
      },
      {
        id: 5,
        title: "Nouvelle donation reçue",
        message: "Don de 50,000 DH reçu de l'Association Al Ihsan pour améliorer les conditions de détention.",
        type: "donation",
        priority: "medium",
        status: "unread",
        timestamp: "2024-12-27T14:10:00Z",
        sender: "Service des Donations",
        facility: "Prison Centrale Meknès",
        category: "Financement",
        actions: ["Voir détails donation", "Planifier utilisation"],
        relatedData: {
          donor: "Association Al Ihsan",
          amount: "50,000 DH",
          purpose: "Amélioration des conditions",
          contact: "Aicha Mansouri"
        }
      },
      {
        id: 6,
        title: "Formation du personnel requise",
        message: "Formation obligatoire sur les nouveaux protocoles de sécurité pour tout le personnel.",
        type: "training",
        priority: "high",
        status: "unread",
        timestamp: "2024-12-27T11:30:00Z",
        sender: "Direction des Ressources Humaines",
        facility: "Toutes les prisons",
        category: "Formation",
        actions: ["Programmer formation", "Voir curriculum"],
        relatedData: {
          trainingType: "Protocoles de sécurité",
          duration: "2 jours",
          deadline: "2025-01-15",
          instructor: "Dr. Youssef Kabiri"
        }
      },
      {
        id: 7,
        title: "Visite d'inspection annoncée",
        message: "Inspection surprise de la Commission des Droits de l'Homme prévue la semaine prochaine.",
        type: "inspection",
        priority: "high",
        status: "read",
        timestamp: "2024-12-26T15:45:00Z",
        sender: "Direction Générale",
        facility: "Prison Centrale Fès",
        category: "Inspection",
        actions: ["Préparer documentation", "Mobiliser équipes"],
        relatedData: {
          inspector: "Commission des Droits de l'Homme",
          expectedDate: "2025-01-02",
          focusAreas: "Conditions de détention, Droits des détenus",
          contact: "Mme. Fatima Radi"
        }
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter notifications based on search and filters
  useEffect(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.facility.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter, priorityFilter, notifications]);

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);

    // Mark as read if unread
    if (notification.status === 'unread') {
      markAsRead(notification.id);
    }
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, status: 'read' }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      status: 'read'
    }));
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    setShowModal(false);
  };

  const getTypeIcon = (type) => {
    const typeConfig = {
      security: 'bi-shield-exclamation',
      report: 'bi-file-earmark-text',
      transfer: 'bi-arrow-left-right',
      maintenance: 'bi-tools',
      donation: 'bi-heart',
      training: 'bi-mortarboard',
      inspection: 'bi-search'
    };

    return typeConfig[type] || 'bi-bell';
  };

  const getTypeColor = (type) => {
    const typeConfig = {
      security: 'danger',
      report: 'info',
      transfer: 'warning',
      maintenance: 'secondary',
      donation: 'success',
      training: 'primary',
      inspection: 'dark'
    };

    return typeConfig[type] || 'secondary';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'danger', text: 'Haute' },
      medium: { color: 'warning', text: 'Moyenne' },
      low: { color: 'success', text: 'Basse' }
    };

    const config = priorityConfig[priority] || { color: 'secondary', text: priority };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      read: { color: 'secondary', text: 'Lu' },
      unread: { color: 'primary', text: 'Non lu' }
    };

    const config = statusConfig[status] || { color: 'secondary', text: status };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'À l\'instant';
    } else if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
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
              <h2 className="mb-1">Centre de Notifications</h2>
              <p className="text-muted">
                Gérer et superviser toutes les notifications système
                {unreadCount > 0 && (
                  <span className="badge bg-danger ms-2">{unreadCount} non lu{unreadCount > 1 ? 'es' : 'e'}</span>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <i className="bi bi-check-all me-2"></i>Marquer tout comme lu
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i>Nouvelle Notification
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
                      <h6 className="card-title mb-0">Total Notifications</h6>
                      <h3 className="mb-0">{notifications.length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-bell-fill" style={{ fontSize: '2rem' }}></i>
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
                      <h6 className="card-title mb-0">Non lues</h6>
                      <h3 className="mb-0">{unreadCount}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-envelope-fill" style={{ fontSize: '2rem' }}></i>
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
                      <h3 className="mb-0">{notifications.filter(n => n.priority === 'high').length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2rem' }}></i>
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
                      <h6 className="card-title mb-0">Aujourd'hui</h6>
                      <h3 className="mb-0">
                        {notifications.filter(n => {
                          const today = new Date();
                          const notifDate = new Date(n.timestamp);
                          return today.toDateString() === notifDate.toDateString();
                        }).length}
                      </h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-calendar-day" style={{ fontSize: '2rem' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label htmlFor="search" className="form-label">Rechercher</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Titre, message, expéditeur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="typeFilter" className="form-label">Type</label>
                  <select
                    className="form-select"
                    id="typeFilter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    <option value="security">Sécurité</option>
                    <option value="report">Rapport</option>
                    <option value="transfer">Transfert</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="donation">Don</option>
                    <option value="training">Formation</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="statusFilter" className="form-label">Statut</label>
                  <select
                    className="form-select"
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="unread">Non lu</option>
                    <option value="read">Lu</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="priorityFilter" className="form-label">Priorité</label>
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
                      setSearchTerm('');
                      setTypeFilter('all');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="card">
            <div className="card-body">
              {currentItems.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item p-3 border-bottom ${
                    notification.status === 'unread' ? 'bg-light' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleViewDetails(notification)}
                >
                  <div className="d-flex align-items-start">
                    <div className={`notification-icon me-3 text-${getTypeColor(notification.type)}`}>
                      <i className={`bi ${getTypeIcon(notification.type)}`} style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className={`mb-1 ${notification.status === 'unread' ? 'fw-bold' : ''}`}>
                          {notification.title}
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {getStatusBadge(notification.status)}
                          <small className="text-muted">{formatTimestamp(notification.timestamp)}</small>
                        </div>
                      </div>
                      <p className="text-muted mb-2">{notification.message}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <small className="text-muted">
                            <i className="bi bi-person-circle me-1"></i>
                            {notification.sender}
                          </small>
                          <small className="text-muted">
                            <i className="bi bi-geo-alt me-1"></i>
                            {notification.facility}
                          </small>
                          <span className={`badge bg-${getTypeColor(notification.type)} bg-opacity-10 text-${getTypeColor(notification.type)}`}>
                            {notification.category}
                          </span>
                        </div>
                        <div className="notification-actions">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(notification);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          {notification.status === 'unread' && (
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                            >
                              <i className="bi bi-check"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">Aucune notification trouvée</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Navigation des pages" className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
      {showModal && selectedNotification && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <i className={`bi ${getTypeIcon(selectedNotification.type)} text-${getTypeColor(selectedNotification.type)} me-2`}></i>
                  {selectedNotification.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-2">
                      {getPriorityBadge(selectedNotification.priority)}
                      {getStatusBadge(selectedNotification.status)}
                      <span className={`badge bg-${getTypeColor(selectedNotification.type)}`}>
                        {selectedNotification.category}
                      </span>
                    </div>
                    <small className="text-muted">
                      {new Date(selectedNotification.timestamp).toLocaleString('fr-FR')}
                    </small>
                  </div>

                  <div className="mb-3">
                    <strong>Expéditeur:</strong> {selectedNotification.sender}
                  </div>

                  <div className="mb-3">
                    <strong>Établissement:</strong> {selectedNotification.facility}
                  </div>

                  <div className="mb-4">
                    <strong>Message:</strong>
                    <p className="mt-2">{selectedNotification.message}</p>
                  </div>

                  {selectedNotification.relatedData && (
                    <div className="mb-4">
                      <strong>Informations supplémentaires:</strong>
                      <div className="mt-2 p-3 bg-light rounded">
                        {Object.entries(selectedNotification.relatedData).map(([key, value]) => (
                          <div key={key} className="row mb-2">
                            <div className="col-4">
                              <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                            </div>
                            <div className="col-8">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNotification.actions && selectedNotification.actions.length > 0 && (
                    <div className="mb-3">
                      <strong>Actions disponibles:</strong>
                      <div className="mt-2">
                        {selectedNotification.actions.map((action, index) => (
                          <button
                            key={index}
                            className="btn btn-outline-primary me-2 mb-2"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deleteNotification(selectedNotification.id)}
                >
                  <i className="bi bi-trash me-2"></i>Supprimer
                </button>
                {selectedNotification.status === 'unread' && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      markAsRead(selectedNotification.id);
                      setShowModal(false);
                    }}
                  >
                    Marquer comme lu
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-item:hover {
          background-color: #f8f9fa !important;
        }

        .notification-actions {
          opacity: 0;
          transition: opacity 0.2s;
        }

        .notification-item:hover .notification-actions {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default NotificationsCenter;
