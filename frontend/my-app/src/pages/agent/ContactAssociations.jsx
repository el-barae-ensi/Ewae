import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ContactAssociations = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageType, setMessageType] = useState('email');
  const [messageForm, setMessageForm] = useState({
    to: '',
    subject: '',
    message: '',
    priority: 'normal',
    type: 'email'
  });

  // Mock data for contact history
  useEffect(() => {
    const mockContacts = [
      {
        id: 1,
        association: "Association Al Amal",
        contact: "Ahmed Bennani",
        role: "Président",
        lastContact: "2024-02-15",
        contactType: "email",
        subject: "Demande de documents comptables",
        status: "responded",
        priority: "high",
        phone: "+212 537 123 456",
        email: "contact@alamal.ma",
        responseTime: "2 heures",
        notes: "Documents fournis dans les délais"
      },
      {
        id: 2,
        association: "Fondation Espoir",
        contact: "Fatima Zahra Alami",
        role: "Directrice",
        lastContact: "2024-02-10",
        contactType: "phone",
        subject: "Vérification des activités éducatives",
        status: "pending",
        priority: "normal",
        phone: "+212 522 987 654",
        email: "info@espoir.org.ma",
        responseTime: "En attente",
        notes: "Relance nécessaire"
      },
      {
        id: 3,
        association: "Association Jeunesse Active",
        contact: "Omar Tazi",
        role: "Président",
        lastContact: "2024-02-08",
        contactType: "meeting",
        subject: "Inspection des locaux",
        status: "completed",
        priority: "high",
        phone: "+212 524 456 789",
        email: "contact@jeunesse-active.ma",
        responseTime: "Immédiate",
        notes: "Réunion productive, actions correctives définies"
      },
      {
        id: 4,
        association: "Association Solidarité",
        contact: "Hassan Benali",
        role: "Secrétaire Général",
        lastContact: "2024-01-30",
        contactType: "email",
        subject: "Mise en demeure - Irrégularités comptables",
        status: "no_response",
        priority: "urgent",
        phone: "+212 535 321 654",
        email: "solidarite@gmail.com",
        responseTime: "Aucune réponse",
        notes: "Procédure disciplinaire en cours"
      },
      {
        id: 5,
        association: "Centre de Développement Local",
        contact: "Nadia Cherkaoui",
        role: "Coordinatrice",
        lastContact: "2024-02-20",
        contactType: "email",
        subject: "Félicitations pour les résultats",
        status: "responded",
        priority: "low",
        phone: "+212 539 876 543",
        email: "cdl@tanger.ma",
        responseTime: "1 jour",
        notes: "Échange très positif"
      }
    ];

    setTimeout(() => {
      setContacts(mockContacts);
      setFilteredContacts(mockContacts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter contacts based on search and filters
  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.association.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(contact => contact.priority === priorityFilter);
    }

    setFilteredContacts(filtered);
  }, [searchTerm, statusFilter, priorityFilter, contacts]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      responded: { class: 'badge bg-success', text: 'Répondu', icon: 'bi-check-circle' },
      pending: { class: 'badge bg-warning', text: 'En attente', icon: 'bi-clock' },
      completed: { class: 'badge bg-info', text: 'Terminé', icon: 'bi-check-all' },
      no_response: { class: 'badge bg-danger', text: 'Aucune réponse', icon: 'bi-x-circle' }
    };
    return statusConfig[status] || { class: 'badge bg-secondary', text: status, icon: 'bi-question' };
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { class: 'badge bg-success', text: 'Faible', icon: 'bi-arrow-down' },
      normal: { class: 'badge bg-primary', text: 'Normal', icon: 'bi-dash' },
      high: { class: 'badge bg-warning', text: 'Élevée', icon: 'bi-arrow-up' },
      urgent: { class: 'badge bg-danger', text: 'Urgent', icon: 'bi-exclamation-triangle' }
    };
    return priorityConfig[priority] || { class: 'badge bg-secondary', text: priority, icon: 'bi-question' };
  };

  const getContactTypeIcon = (type) => {
    const typeIcons = {
      email: 'bi-envelope',
      phone: 'bi-telephone',
      meeting: 'bi-people',
      letter: 'bi-file-text'
    };
    return typeIcons[type] || 'bi-chat-dots';
  };

  const handleComposeMessage = (contact = null) => {
    if (contact) {
      setMessageForm({
        ...messageForm,
        to: contact.association,
        toEmail: contact.email,
        toPhone: contact.phone
      });
    }
    setSelectedContact(contact);
    setShowComposeModal(true);
  };

  const handleSendMessage = () => {
    // Here you would implement the actual message sending logic
    console.log('Sending message:', messageForm);

    // Add new contact record
    const newContact = {
      id: contacts.length + 1,
      association: messageForm.to,
      contact: selectedContact?.contact || 'Contact',
      role: selectedContact?.role || 'Responsable',
      lastContact: new Date().toISOString().split('T')[0],
      contactType: messageForm.type,
      subject: messageForm.subject,
      status: 'pending',
      priority: messageForm.priority,
      phone: selectedContact?.phone || '',
      email: selectedContact?.email || '',
      responseTime: 'En attente',
      notes: 'Message envoyé'
    };

    setContacts([newContact, ...contacts]);
    setFilteredContacts([newContact, ...filteredContacts]);
    setShowComposeModal(false);
    setMessageForm({
      to: '',
      subject: '',
      message: '',
      priority: 'normal',
      type: 'email'
    });
    setSelectedContact(null);
  };

  const associations = [...new Set(contacts.map(c => c.association))];

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
              <h2 className="mb-0">
                <i className="bi bi-chat-dots me-2"></i>
                Contact avec les Associations
              </h2>
              <p className="text-muted mb-0">Communication et suivi des échanges</p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleComposeMessage()}
              >
                <i className="bi bi-plus me-1"></i>
                Nouveau Contact
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-download me-1"></i>
                Exporter Historique
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Rechercher</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Association, contact, sujet..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Statut</label>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="responded">Répondu</option>
                    <option value="pending">En attente</option>
                    <option value="completed">Terminé</option>
                    <option value="no_response">Aucune réponse</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Priorité</label>
                  <select
                    className="form-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">Toutes les priorités</option>
                    <option value="low">Faible</option>
                    <option value="normal">Normal</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body">
                  <h6 className="card-title">Actions Rapides</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-sm btn-outline-success">
                      <i className="bi bi-envelope me-1"></i>
                      Email en Masse
                    </button>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-telephone me-1"></i>
                      Appel Programmé
                    </button>
                    <button className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-calendar me-1"></i>
                      Réunion
                    </button>
                    <button className="btn btn-sm btn-outline-info">
                      <i className="bi bi-file-text me-1"></i>
                      Rapport de Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Total Contacts</h6>
                      <h3 className="mb-0">{contacts.length}</h3>
                    </div>
                    <i className="bi bi-chat-dots fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">En Attente</h6>
                      <h3 className="mb-0">{contacts.filter(c => c.status === 'pending').length}</h3>
                    </div>
                    <i className="bi bi-clock fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Urgent</h6>
                      <h3 className="mb-0">{contacts.filter(c => c.priority === 'urgent').length}</h3>
                    </div>
                    <i className="bi bi-exclamation-triangle fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Répondus</h6>
                      <h3 className="mb-0">{contacts.filter(c => c.status === 'responded').length}</h3>
                    </div>
                    <i className="bi bi-check-circle fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Association</th>
                      <th>Contact</th>
                      <th>Type</th>
                      <th>Sujet</th>
                      <th>Priorité</th>
                      <th>Statut</th>
                      <th>Temps de Réponse</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map(contact => {
                      const statusBadge = getStatusBadge(contact.status);
                      const priorityBadge = getPriorityBadge(contact.priority);

                      return (
                        <tr key={contact.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-building"></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{contact.association}</h6>
                                <small className="text-muted">{new Date(contact.lastContact).toLocaleDateString('fr-FR')}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{contact.contact}</strong>
                              <br />
                              <small className="text-muted">{contact.role}</small>
                            </div>
                          </td>
                          <td>
                            <i className={`bi ${getContactTypeIcon(contact.contactType)} me-1`}></i>
                            {contact.contactType === 'email' && 'Email'}
                            {contact.contactType === 'phone' && 'Téléphone'}
                            {contact.contactType === 'meeting' && 'Réunion'}
                            {contact.contactType === 'letter' && 'Courrier'}
                          </td>
                          <td>
                            <span title={contact.subject}>
                              {contact.subject.length > 30 ? contact.subject.substring(0, 30) + '...' : contact.subject}
                            </span>
                          </td>
                          <td>
                            <span className={priorityBadge.class}>
                              <i className={`${priorityBadge.icon} me-1`}></i>
                              {priorityBadge.text}
                            </span>
                          </td>
                          <td>
                            <span className={statusBadge.class}>
                              <i className={`${statusBadge.icon} me-1`}></i>
                              {statusBadge.text}
                            </span>
                          </td>
                          <td>
                            <small className={contact.responseTime === 'Aucune réponse' ? 'text-danger' : 'text-muted'}>
                              {contact.responseTime}
                            </small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-success"
                                onClick={() => handleComposeMessage(contact)}
                                title="Contacter"
                              >
                                <i className="bi bi-reply"></i>
                              </button>
                              <button
                                className="btn btn-outline-primary"
                                title="Voir détails"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                title="Programmer suivi"
                              >
                                <i className="bi bi-calendar-plus"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredContacts.length === 0 && !loading && (
            <div className="text-center py-5">
              <i className="bi bi-chat-dots display-4 text-muted"></i>
              <h5 className="mt-3">Aucun contact trouvé</h5>
              <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-plus me-2"></i>
                  Nouveau Contact
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowComposeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Association</label>
                      <select
                        className="form-select"
                        value={messageForm.to}
                        onChange={(e) => setMessageForm({...messageForm, to: e.target.value})}
                        required
                      >
                        <option value="">Sélectionner une association</option>
                        {associations.map(association => (
                          <option key={association} value={association}>{association}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Type de contact</label>
                      <select
                        className="form-select"
                        value={messageForm.type}
                        onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Téléphone</option>
                        <option value="meeting">Réunion</option>
                        <option value="letter">Courrier</option>
                      </select>
                    </div>
                    <div className="col-md-8">
                      <label className="form-label">Sujet</label>
                      <input
                        type="text"
                        className="form-control"
                        value={messageForm.subject}
                        onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                        placeholder="Objet du contact"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Priorité</label>
                      <select
                        className="form-select"
                        value={messageForm.priority}
                        onChange={(e) => setMessageForm({...messageForm, priority: e.target.value})}
                      >
                        <option value="low">Faible</option>
                        <option value="normal">Normal</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="6"
                        value={messageForm.message}
                        onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                        placeholder="Contenu du message..."
                        required
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowComposeModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendMessage}
                  disabled={!messageForm.to || !messageForm.subject || !messageForm.message}
                >
                  <i className="bi bi-send me-1"></i>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showComposeModal && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default ContactAssociations;
