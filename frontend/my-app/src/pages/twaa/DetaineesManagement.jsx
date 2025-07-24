import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const DetaineesManagement = () => {
  const { user } = useAuth();
  const [detainees, setDetainees] = useState([]);
  const [filteredDetainees, setFilteredDetainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [selectedDetainee, setSelectedDetainee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for detainees
  useEffect(() => {
    const mockDetainees = [
      {
        id: 1,
        firstName: "Ahmed",
        lastName: "Ben Ali",
        cin: "BE123456",
        dateOfBirth: "1985-03-15",
        facility: "Prison Centrale Rabat",
        status: "detained",
        admissionDate: "2023-06-10",
        expectedRelease: "2025-06-10",
        charges: ["Vol aggravé", "Résistance aux forces de l'ordre"],
        riskLevel: "medium",
        medicalConditions: ["Diabète"],
        visitors: ["Fatima Ben Ali (épouse)", "Omar Ben Ali (frère)"],
        behavior: "good",
        workAssignment: "Atelier menuiserie",
        education: "Cours d'alphabétisation",
        lastIncident: null,
        phone: "+212 661 234 567",
        emergencyContact: "Fatima Ben Ali - +212 661 234 568"
      },
      {
        id: 2,
        firstName: "Mohamed",
        lastName: "Alami",
        cin: "BA987654",
        dateOfBirth: "1990-11-22",
        facility: "Prison Locale Casa",
        status: "detained",
        admissionDate: "2024-01-15",
        expectedRelease: "2024-07-15",
        charges: ["Conduite en état d'ivresse"],
        riskLevel: "low",
        medicalConditions: [],
        visitors: ["Aicha Alami (mère)"],
        behavior: "excellent",
        workAssignment: "Bibliothèque",
        education: "Formation informatique",
        lastIncident: null,
        phone: "+212 662 987 654",
        emergencyContact: "Aicha Alami - +212 662 987 655"
      },
      {
        id: 3,
        firstName: "Youssef",
        lastName: "Benjelloun",
        cin: "BH456789",
        dateOfBirth: "1978-07-08",
        facility: "Prison Centrale Fès",
        status: "transferred",
        admissionDate: "2022-03-20",
        expectedRelease: "2027-03-20",
        charges: ["Trafic de drogue", "Association de malfaiteurs"],
        riskLevel: "high",
        medicalConditions: ["Hypertension", "Trouble anxieux"],
        visitors: [],
        behavior: "difficult",
        workAssignment: "Cuisine",
        education: "Refus de participer",
        lastIncident: "2024-02-10",
        phone: "+212 663 456 789",
        emergencyContact: "Khadija Benjelloun - +212 663 456 790"
      },
      {
        id: 4,
        firstName: "Rachid",
        lastName: "Karimi",
        cin: "BK789123",
        dateOfBirth: "1995-12-03",
        facility: "Prison Locale Tanger",
        status: "released",
        admissionDate: "2023-08-05",
        expectedRelease: "2024-02-05",
        releaseDate: "2024-02-05",
        charges: ["Escroquerie"],
        riskLevel: "low",
        medicalConditions: [],
        visitors: ["Hassan Karimi (père)"],
        behavior: "good",
        workAssignment: "Jardin",
        education: "Formation professionnelle",
        lastIncident: null,
        phone: "+212 664 789 123",
        emergencyContact: "Hassan Karimi - +212 664 789 124"
      },
      {
        id: 5,
        firstName: "Abdellah",
        lastName: "Moussaoui",
        cin: "BM321654",
        dateOfBirth: "1982-05-18",
        facility: "Prison Centrale Meknès",
        status: "detained",
        admissionDate: "2021-11-30",
        expectedRelease: "2026-11-30",
        charges: ["Homicide involontaire"],
        riskLevel: "medium",
        medicalConditions: ["Asthme"],
        visitors: ["Zineb Moussaoui (épouse)", "Salma Moussaoui (fille)"],
        behavior: "good",
        workAssignment: "Atelier textile",
        education: "Cours de français",
        lastIncident: null,
        phone: "+212 665 321 654",
        emergencyContact: "Zineb Moussaoui - +212 665 321 655"
      }
    ];

    setTimeout(() => {
      setDetainees(mockDetainees);
      setFilteredDetainees(mockDetainees);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter detainees based on search and filters
  useEffect(() => {
    let filtered = detainees.filter(detainee => {
      const matchesSearch =
        detainee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detainee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detainee.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detainee.facility.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || detainee.status === statusFilter;
      const matchesFacility = facilityFilter === 'all' || detainee.facility === facilityFilter;

      return matchesSearch && matchesStatus && matchesFacility;
    });

    setFilteredDetainees(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, facilityFilter, detainees]);

  const handleViewDetails = (detainee) => {
    setSelectedDetainee(detainee);
    setShowModal(true);
  };

  const handleTransfer = (detaineeId) => {
    const updatedDetainees = detainees.map(detainee =>
      detainee.id === detaineeId
        ? { ...detainee, status: 'transferred' }
        : detainee
    );
    setDetainees(updatedDetainees);
    alert('Détenu transféré avec succès');
  };

  const handleRelease = (detaineeId) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedDetainees = detainees.map(detainee =>
      detainee.id === detaineeId
        ? { ...detainee, status: 'released', releaseDate: today }
        : detainee
    );
    setDetainees(updatedDetainees);
    alert('Détenu libéré avec succès');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      detained: { color: 'primary', text: 'Détenu' },
      transferred: { color: 'warning', text: 'Transféré' },
      released: { color: 'success', text: 'Libéré' }
    };

    const config = statusConfig[status] || { color: 'secondary', text: status };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      low: { color: 'success', text: 'Faible' },
      medium: { color: 'warning', text: 'Moyen' },
      high: { color: 'danger', text: 'Élevé' }
    };

    const config = riskConfig[riskLevel] || { color: 'secondary', text: riskLevel };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  const getBehaviorBadge = (behavior) => {
    const behaviorConfig = {
      excellent: { color: 'success', text: 'Excellent' },
      good: { color: 'primary', text: 'Bon' },
      average: { color: 'warning', text: 'Moyen' },
      difficult: { color: 'danger', text: 'Difficile' }
    };

    const config = behaviorConfig[behavior] || { color: 'secondary', text: behavior };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDetainees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDetainees.length / itemsPerPage);

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
              <h2 className="mb-1">Gestion des Détenus</h2>
              <p className="text-muted">Gérer et superviser les informations des détenus</p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer me-2"></i>Imprimer
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>Nouveau Détenu
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
                      <h6 className="card-title mb-0">Total Détenus</h6>
                      <h3 className="mb-0">{detainees.length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-people-fill" style={{ fontSize: '2rem' }}></i>
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
                      <h6 className="card-title mb-0">Actuellement Détenus</h6>
                      <h3 className="mb-0">{detainees.filter(d => d.status === 'detained').length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-person-lock" style={{ fontSize: '2rem' }}></i>
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
                      <h6 className="card-title mb-0">Libérés</h6>
                      <h3 className="mb-0">{detainees.filter(d => d.status === 'released').length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-person-check" style={{ fontSize: '2rem' }}></i>
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
                      <h6 className="card-title mb-0">Risque Élevé</h6>
                      <h3 className="mb-0">{detainees.filter(d => d.riskLevel === 'high').length}</h3>
                    </div>
                    <div className="align-self-center">
                      <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2rem' }}></i>
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
                <div className="col-md-4">
                  <label htmlFor="search" className="form-label">Rechercher</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Nom, CIN, établissement..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="statusFilter" className="form-label">Statut</label>
                  <select
                    className="form-select"
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="detained">Détenu</option>
                    <option value="transferred">Transféré</option>
                    <option value="released">Libéré</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="facilityFilter" className="form-label">Établissement</label>
                  <select
                    className="form-select"
                    id="facilityFilter"
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                  >
                    <option value="all">Tous les établissements</option>
                    <option value="Prison Centrale Rabat">Prison Centrale Rabat</option>
                    <option value="Prison Locale Casa">Prison Locale Casa</option>
                    <option value="Prison Centrale Fès">Prison Centrale Fès</option>
                    <option value="Prison Locale Tanger">Prison Locale Tanger</option>
                    <option value="Prison Centrale Meknès">Prison Centrale Meknès</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setFacilityFilter('all');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detainees Table */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Détenu</th>
                      <th>CIN</th>
                      <th>Établissement</th>
                      <th>Statut</th>
                      <th>Risque</th>
                      <th>Comportement</th>
                      <th>Date d'admission</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((detainee) => (
                      <tr key={detainee.id}>
                        <td>
                          <div>
                            <strong>{detainee.firstName} {detainee.lastName}</strong>
                            <br />
                            <small className="text-muted">
                              Né le {new Date(detainee.dateOfBirth).toLocaleDateString('fr-FR')}
                            </small>
                          </div>
                        </td>
                        <td>{detainee.cin}</td>
                        <td>
                          <small className="text-muted">{detainee.facility}</small>
                        </td>
                        <td>{getStatusBadge(detainee.status)}</td>
                        <td>{getRiskBadge(detainee.riskLevel)}</td>
                        <td>{getBehaviorBadge(detainee.behavior)}</td>
                        <td>{new Date(detainee.admissionDate).toLocaleDateString('fr-FR')}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => handleViewDetails(detainee)}
                              title="Voir détails"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            {detainee.status === 'detained' && (
                              <>
                                <button
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() => handleTransfer(detainee.id)}
                                  title="Transférer"
                                >
                                  <i className="bi bi-arrow-left-right"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => handleRelease(detainee.id)}
                                  title="Libérer"
                                >
                                  <i className="bi bi-unlock"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredDetainees.length === 0 && (
                  <div className="text-center py-4">
                    <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                    <p className="text-muted mt-2">Aucun détenu trouvé</p>
                  </div>
                )}
              </div>

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
      {showModal && selectedDetainee && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Détails du détenu - {selectedDetainee.firstName} {selectedDetainee.lastName}
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
                    <h6>Informations personnelles</h6>
                    <p><strong>CIN:</strong> {selectedDetainee.cin}</p>
                    <p><strong>Date de naissance:</strong> {new Date(selectedDetainee.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Téléphone:</strong> {selectedDetainee.phone}</p>
                    <p><strong>Contact d'urgence:</strong> {selectedDetainee.emergencyContact}</p>

                    <h6 className="mt-4">Informations de détention</h6>
                    <p><strong>Établissement:</strong> {selectedDetainee.facility}</p>
                    <p><strong>Date d'admission:</strong> {new Date(selectedDetainee.admissionDate).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Date de libération prévue:</strong> {new Date(selectedDetainee.expectedRelease).toLocaleDateString('fr-FR')}</p>
                    {selectedDetainee.releaseDate && (
                      <p><strong>Date de libération:</strong> {new Date(selectedDetainee.releaseDate).toLocaleDateString('fr-FR')}</p>
                    )}
                    <p><strong>Statut:</strong> {getStatusBadge(selectedDetainee.status)}</p>
                    <p><strong>Niveau de risque:</strong> {getRiskBadge(selectedDetainee.riskLevel)}</p>
                    <p><strong>Comportement:</strong> {getBehaviorBadge(selectedDetainee.behavior)}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Charges</h6>
                    <ul>
                      {selectedDetainee.charges.map((charge, index) => (
                        <li key={index}>{charge}</li>
                      ))}
                    </ul>

                    <h6>Conditions médicales</h6>
                    {selectedDetainee.medicalConditions.length > 0 ? (
                      <ul>
                        {selectedDetainee.medicalConditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">Aucune condition médicale signalée</p>
                    )}

                    <h6>Visiteurs autorisés</h6>
                    {selectedDetainee.visitors.length > 0 ? (
                      <ul>
                        {selectedDetainee.visitors.map((visitor, index) => (
                          <li key={index}>{visitor}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">Aucun visiteur autorisé</p>
                    )}

                    <h6>Activités</h6>
                    <p><strong>Affectation de travail:</strong> {selectedDetainee.workAssignment}</p>
                    <p><strong>Éducation:</strong> {selectedDetainee.education}</p>

                    {selectedDetainee.lastIncident && (
                      <>
                        <h6>Dernier incident</h6>
                        <p className="text-warning">{new Date(selectedDetainee.lastIncident).toLocaleDateString('fr-FR')}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
                <button type="button" className="btn btn-primary">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetaineesManagement;
