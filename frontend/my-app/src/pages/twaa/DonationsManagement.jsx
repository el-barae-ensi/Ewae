import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const DonationsManagement = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    pending: 0,
    processed: 0
  });

  // Mock data for donations
  useEffect(() => {
    const mockDonations = [
      {
        id: 1,
        donorName: "Mohammed Alami",
        donorEmail: "m.alami@email.com",
        donorPhone: "+212 661 234 567",
        amount: 5000,
        currency: "MAD",
        type: "monetary",
        status: "completed",
        date: "2024-02-15T10:30:00",
        method: "bank_transfer",
        reference: "DON-2024-001",
        targetAssociation: "Association Al Amal",
        purpose: "Aide aux orphelins",
        anonymous: false,
        notes: "Don mensuel régulier",
        receiptSent: true,
        taxDeductible: true
      },
      {
        id: 2,
        donorName: "Fatima Zahra Benali",
        donorEmail: "f.benali@email.com",
        donorPhone: "+212 662 345 678",
        amount: 2500,
        currency: "MAD",
        type: "monetary",
        status: "pending",
        date: "2024-02-14T14:20:00",
        method: "credit_card",
        reference: "DON-2024-002",
        targetAssociation: "Fondation Espoir",
        purpose: "Matériel éducatif",
        anonymous: false,
        notes: "Premier don",
        receiptSent: false,
        taxDeductible: true
      },
      {
        id: 3,
        donorName: "Donateur Anonyme",
        donorEmail: "",
        donorPhone: "",
        amount: 10000,
        currency: "MAD",
        type: "monetary",
        status: "completed",
        date: "2024-02-13T09:15:00",
        method: "cash",
        reference: "DON-2024-003",
        targetAssociation: "Association Solidarité",
        purpose: "Urgence médicale",
        anonymous: true,
        notes: "Don d'urgence anonyme",
        receiptSent: false,
        taxDeductible: false
      },
      {
        id: 4,
        donorName: "Omar Tazi",
        donorEmail: "o.tazi@company.ma",
        donorPhone: "+212 663 456 789",
        amount: 0,
        currency: "MAD",
        type: "material",
        status: "completed",
        date: "2024-02-12T16:45:00",
        method: "in_kind",
        reference: "DON-2024-004",
        targetAssociation: "Centre de Développement Local",
        purpose: "Vêtements d'hiver",
        anonymous: false,
        notes: "200 vêtements d'hiver neufs",
        receiptSent: true,
        taxDeductible: false,
        materialDescription: "Vêtements d'hiver: manteaux, pulls, chaussures"
      },
      {
        id: 5,
        donorName: "Nadia Cherkaoui",
        donorEmail: "n.cherkaoui@email.com",
        donorPhone: "+212 664 567 890",
        amount: 7500,
        currency: "MAD",
        type: "monetary",
        status: "failed",
        date: "2024-02-11T11:30:00",
        method: "bank_transfer",
        reference: "DON-2024-005",
        targetAssociation: "Association Jeunesse Active",
        purpose: "Activités sportives",
        anonymous: false,
        notes: "Problème de virement bancaire",
        receiptSent: false,
        taxDeductible: true,
        failureReason: "Compte bancaire incorrect"
      },
      {
        id: 6,
        donorName: "Hassan Benkirane",
        donorEmail: "h.benkirane@email.com",
        donorPhone: "+212 665 678 901",
        amount: 3000,
        currency: "MAD",
        type: "monetary",
        status: "processing",
        date: "2024-02-10T13:20:00",
        method: "mobile_payment",
        reference: "DON-2024-006",
        targetAssociation: "Association Al Amal",
        purpose: "Formation professionnelle",
        anonymous: false,
        notes: "Paiement mobile en cours de vérification",
        receiptSent: false,
        taxDeductible: true
      }
    ];

    setTimeout(() => {
      setDonations(mockDonations);
      setFilteredDonations(mockDonations);

      // Calculate stats
      const totalAmount = mockDonations
        .filter(d => d.type === 'monetary' && d.status === 'completed')
        .reduce((sum, d) => sum + d.amount, 0);

      const thisMonth = mockDonations
        .filter(d => {
          const donationDate = new Date(d.date);
          const now = new Date();
          return donationDate.getMonth() === now.getMonth() &&
                 donationDate.getFullYear() === now.getFullYear() &&
                 d.type === 'monetary' && d.status === 'completed';
        })
        .reduce((sum, d) => sum + d.amount, 0);

      setStats({
        total: totalAmount,
        thisMonth: thisMonth,
        pending: mockDonations.filter(d => d.status === 'pending').length,
        processed: mockDonations.filter(d => d.status === 'completed').length
      });

      setLoading(false);
    }, 1000);
  }, []);

  // Filter donations
  useEffect(() => {
    let filtered = donations;

    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.targetAssociation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(donation => donation.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(donation => donation.type === typeFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(donation => {
        const donationDate = new Date(donation.date);
        switch (dateFilter) {
          case 'today':
            return donationDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return donationDate >= weekAgo;
          case 'month':
            return donationDate.getMonth() === now.getMonth() &&
                   donationDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredDonations(filtered);
  }, [searchTerm, statusFilter, typeFilter, dateFilter, donations]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'badge bg-success', text: 'Complété', icon: 'bi-check-circle' },
      pending: { class: 'badge bg-warning', text: 'En attente', icon: 'bi-clock' },
      processing: { class: 'badge bg-info', text: 'En traitement', icon: 'bi-gear' },
      failed: { class: 'badge bg-danger', text: 'Échec', icon: 'bi-x-circle' },
      cancelled: { class: 'badge bg-secondary', text: 'Annulé', icon: 'bi-slash-circle' }
    };
    return statusConfig[status] || { class: 'badge bg-secondary', text: status, icon: 'bi-question' };
  };

  const getMethodIcon = (method) => {
    const methodIcons = {
      bank_transfer: 'bi-bank',
      credit_card: 'bi-credit-card',
      mobile_payment: 'bi-phone',
      cash: 'bi-cash',
      in_kind: 'bi-box'
    };
    return methodIcons[method] || 'bi-question';
  };

  const getMethodLabel = (method) => {
    const methodLabels = {
      bank_transfer: 'Virement bancaire',
      credit_card: 'Carte bancaire',
      mobile_payment: 'Paiement mobile',
      cash: 'Espèces',
      in_kind: 'En nature'
    };
    return methodLabels[method] || method;
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const handleStatusUpdate = (donationId, newStatus) => {
    const updatedDonations = donations.map(donation =>
      donation.id === donationId
        ? { ...donation, status: newStatus }
        : donation
    );
    setDonations(updatedDonations);
  };

  const handleSendReceipt = (donationId) => {
    const updatedDonations = donations.map(donation =>
      donation.id === donationId
        ? { ...donation, receiptSent: true }
        : donation
    );
    setDonations(updatedDonations);
    alert('Reçu envoyé avec succès!');
  };

  const formatAmount = (amount, currency = 'MAD') => {
    if (amount === 0) return 'Don en nature';
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

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
                <i className="bi bi-currency-dollar me-2"></i>
                Gestion des Donations
              </h2>
              <p className="text-muted mb-0">Suivi et gestion des dons reçus</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
              <button className="btn btn-outline-success">
                <i className="bi bi-receipt me-1"></i>
                Reçus fiscaux
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Enregistrer don
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
                      <h6 className="card-title">Total collecté</h6>
                      <h3 className="mb-0">{formatAmount(stats.total)}</h3>
                    </div>
                    <i className="bi bi-currency-dollar fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Ce mois</h6>
                      <h3 className="mb-0">{formatAmount(stats.thisMonth)}</h3>
                    </div>
                    <i className="bi bi-calendar-month fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">En attente</h6>
                      <h3 className="mb-0">{stats.pending}</h3>
                    </div>
                    <i className="bi bi-clock fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Traités</h6>
                      <h3 className="mb-0">{stats.processed}</h3>
                    </div>
                    <i className="bi bi-check-circle fs-1"></i>
                  </div>
                </div>
              </div>
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
                      placeholder="Donateur, référence, association..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Statut</label>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="completed">Complété</option>
                    <option value="pending">En attente</option>
                    <option value="processing">En traitement</option>
                    <option value="failed">Échec</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="monetary">Monétaire</option>
                    <option value="material">Matériel</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Période</label>
                  <select
                    className="form-select"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">Toutes</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setTypeFilter('all');
                      setDateFilter('all');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Donations Table */}
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Référence</th>
                      <th>Donateur</th>
                      <th>Montant</th>
                      <th>Association</th>
                      <th>Méthode</th>
                      <th>Statut</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map(donation => {
                      const statusBadge = getStatusBadge(donation.status);

                      return (
                        <tr key={donation.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                                <i className={`bi ${donation.type === 'monetary' ? 'bi-currency-dollar' : 'bi-box'}`}></i>
                              </div>
                              <div>
                                <strong>{donation.reference}</strong>
                                {donation.taxDeductible && (
                                  <div>
                                    <small className="badge bg-light text-dark">
                                      <i className="bi bi-receipt me-1"></i>
                                      Déductible
                                    </small>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{donation.donorName}</strong>
                              {!donation.anonymous && donation.donorEmail && (
                                <div><small className="text-muted">{donation.donorEmail}</small></div>
                              )}
                            </div>
                          </td>
                          <td>
                            <strong className={donation.type === 'monetary' ? 'text-success' : 'text-info'}>
                              {formatAmount(donation.amount, donation.currency)}
                            </strong>
                            <div>
                              <small className="text-muted">{donation.purpose}</small>
                            </div>
                          </td>
                          <td>
                            <small>{donation.targetAssociation}</small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className={`bi ${getMethodIcon(donation.method)} me-1`}></i>
                              <small>{getMethodLabel(donation.method)}</small>
                            </div>
                          </td>
                          <td>
                            <span className={statusBadge.class}>
                              <i className={`${statusBadge.icon} me-1`}></i>
                              {statusBadge.text}
                            </span>
                          </td>
                          <td>
                            <small>{formatDate(donation.date)}</small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleViewDonation(donation)}
                                title="Voir détails"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              {donation.status === 'completed' && !donation.receiptSent && (
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => handleSendReceipt(donation.id)}
                                  title="Envoyer reçu"
                                >
                                  <i className="bi bi-receipt"></i>
                                </button>
                              )}
                              {donation.status === 'pending' && (
                                <div className="btn-group btn-group-sm" role="group">
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleStatusUpdate(donation.id, 'completed')}
                                    title="Approuver"
                                  >
                                    <i className="bi bi-check"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleStatusUpdate(donation.id, 'failed')}
                                    title="Rejeter"
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </div>
                              )}
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

          {filteredDonations.length === 0 && !loading && (
            <div className="text-center py-5">
              <i className="bi bi-currency-dollar display-4 text-muted"></i>
              <h5 className="mt-3">Aucune donation trouvée</h5>
              <p className="text-muted">Aucune donation ne correspond à vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* Donation Details Modal */}
      {showModal && selectedDonation && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-currency-dollar me-2"></i>
                  Détails de la donation {selectedDonation.reference}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Informations du donateur</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Nom:</strong></td>
                          <td>{selectedDonation.donorName}</td>
                        </tr>
                        {!selectedDonation.anonymous && (
                          <>
                            <tr>
                              <td><strong>Email:</strong></td>
                              <td>{selectedDonation.donorEmail}</td>
                            </tr>
                            <tr>
                              <td><strong>Téléphone:</strong></td>
                              <td>{selectedDonation.donorPhone}</td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <td><strong>Anonyme:</strong></td>
                          <td>{selectedDonation.anonymous ? 'Oui' : 'Non'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Détails de la donation</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Montant:</strong></td>
                          <td className="text-success fw-bold">
                            {formatAmount(selectedDonation.amount, selectedDonation.currency)}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Type:</strong></td>
                          <td>{selectedDonation.type === 'monetary' ? 'Monétaire' : 'Matériel'}</td>
                        </tr>
                        <tr>
                          <td><strong>Méthode:</strong></td>
                          <td>
                            <i className={`bi ${getMethodIcon(selectedDonation.method)} me-1`}></i>
                            {getMethodLabel(selectedDonation.method)}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Statut:</strong></td>
                          <td>
                            <span className={getStatusBadge(selectedDonation.status).class}>
                              {getStatusBadge(selectedDonation.status).text}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Date:</strong></td>
                          <td>{formatDate(selectedDonation.date)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Destination</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Association:</strong></td>
                          <td>{selectedDonation.targetAssociation}</td>
                        </tr>
                        <tr>
                          <td><strong>Objectif:</strong></td>
                          <td>{selectedDonation.purpose}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Administration</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Déductible:</strong></td>
                          <td>{selectedDonation.taxDeductible ? 'Oui' : 'Non'}</td>
                        </tr>
                        <tr>
                          <td><strong>Reçu envoyé:</strong></td>
                          <td>{selectedDonation.receiptSent ? 'Oui' : 'Non'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {selectedDonation.materialDescription && (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <h6>Description du matériel</h6>
                        <p className="text-muted">{selectedDonation.materialDescription}</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedDonation.notes && (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <h6>Notes</h6>
                        <p className="text-muted">{selectedDonation.notes}</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedDonation.failureReason && (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <h6>Raison de l'échec</h6>
                        <div className="alert alert-danger">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {selectedDonation.failureReason}
                        </div>
                      </div>
                    </div>
                  </>
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
                {selectedDonation.status === 'completed' && !selectedDonation.receiptSent && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      handleSendReceipt(selectedDonation.id);
                      setShowModal(false);
                    }}
                  >
                    <i className="bi bi-receipt me-1"></i>
                    Envoyer Reçu
                  </button>
                )}
                <button type="button" className="btn btn-primary">
                  <i className="bi bi-printer me-1"></i>
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default DonationsManagement;
