import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AssociationsList = () => {
  const { user } = useAuth();
  const [associations, setAssociations] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for associations
  useEffect(() => {
    const mockAssociations = [
      {
        id: 1,
        name: "Association Al Amal",
        type: "Aide Sociale",
        status: "active",
        region: "Rabat-Salé-Kénitra",
        address: "Avenue Mohammed V, Rabat",
        phone: "+212 537 123 456",
        email: "contact@alamal.ma",
        president: "Ahmed Bennani",
        foundedDate: "2015-03-15",
        members: 45,
        budget: "150000",
        projects: ["Aide aux orphelins", "Formation professionnelle"],
        lastInspection: "2024-01-15",
        inspectionStatus: "Conforme",
        riskLevel: "low"
      },
      {
        id: 2,
        name: "Fondation Espoir",
        type: "Éducation",
        status: "active",
        region: "Casablanca-Settat",
        address: "Boulevard Zerktouni, Casablanca",
        phone: "+212 522 987 654",
        email: "info@espoir.org.ma",
        president: "Fatima Zahra Alami",
        foundedDate: "2010-09-20",
        members: 78,
        budget: "300000",
        projects: ["Bourses d'études", "Alphabétisation"],
        lastInspection: "2024-02-10",
        inspectionStatus: "Conforme",
        riskLevel: "low"
      },
      {
        id: 3,
        name: "Association Jeunesse Active",
        type: "Sport et Culture",
        status: "under_review",
        region: "Marrakech-Safi",
        address: "Rue de la Liberté, Marrakech",
        phone: "+212 524 456 789",
        email: "contact@jeunesse-active.ma",
        president: "Omar Tazi",
        foundedDate: "2020-06-10",
        members: 32,
        budget: "80000",
        projects: ["Activités sportives", "Événements culturels"],
        lastInspection: "2024-01-30",
        inspectionStatus: "En cours de vérification",
        riskLevel: "medium"
      },
      {
        id: 4,
        name: "Association Solidarité",
        type: "Aide Humanitaire",
        status: "suspended",
        region: "Fès-Meknès",
        address: "Quartier Atlas, Fès",
        phone: "+212 535 321 654",
        email: "solidarite@gmail.com",
        president: "Hassan Benali",
        foundedDate: "2018-11-05",
        members: 25,
        budget: "200000",
        projects: ["Aide alimentaire", "Soins médicaux"],
        lastInspection: "2023-12-15",
        inspectionStatus: "Non conforme",
        riskLevel: "high"
      },
      {
        id: 5,
        name: "Centre de Développement Local",
        type: "Développement",
        status: "active",
        region: "Tanger-Tétouan-Al Hoceima",
        address: "Avenue Hassan II, Tanger",
        phone: "+212 539 876 543",
        email: "cdl@tanger.ma",
        president: "Nadia Cherkaoui",
        foundedDate: "2012-04-18",
        members: 67,
        budget: "450000",
        projects: ["Microcrédit", "Formation agricole"],
        lastInspection: "2024-02-20",
        inspectionStatus: "Conforme",
        riskLevel: "low"
      }
    ];

    setTimeout(() => {
      setAssociations(mockAssociations);
      setFilteredAssociations(mockAssociations);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter associations based on search and filters
  useEffect(() => {
    let filtered = associations;

    if (searchTerm) {
      filtered = filtered.filter(association =>
        association.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        association.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
        association.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(association => association.status === statusFilter);
    }

    if (regionFilter !== 'all') {
      filtered = filtered.filter(association => association.region === regionFilter);
    }

    setFilteredAssociations(filtered);
  }, [searchTerm, statusFilter, regionFilter, associations]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'badge bg-success', text: 'Actif' },
      under_review: { class: 'badge bg-warning', text: 'En révision' },
      suspended: { class: 'badge bg-danger', text: 'Suspendu' }
    };
    return statusConfig[status] || { class: 'badge bg-secondary', text: status };
  };

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      low: { class: 'badge bg-success', text: 'Faible', icon: 'bi-shield-check' },
      medium: { class: 'badge bg-warning', text: 'Moyen', icon: 'bi-shield-exclamation' },
      high: { class: 'badge bg-danger', text: 'Élevé', icon: 'bi-shield-x' }
    };
    return riskConfig[riskLevel] || { class: 'badge bg-secondary', text: riskLevel, icon: 'bi-shield' };
  };

  const handleViewDetails = (association) => {
    setSelectedAssociation(association);
    setShowModal(true);
  };

  const regions = [...new Set(associations.map(a => a.region))];

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
                <i className="bi bi-building me-2"></i>
                Associations
              </h2>
              <p className="text-muted mb-0">Gestion et surveillance des associations</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouvelle Inspection
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
                      placeholder="Nom, président, type..."
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
                    <option value="active">Actif</option>
                    <option value="under_review">En révision</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Région</label>
                  <select
                    className="form-select"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                  >
                    <option value="all">Toutes les régions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setRegionFilter('all');
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
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Total</h6>
                      <h3 className="mb-0">{associations.length}</h3>
                    </div>
                    <i className="bi bi-building fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Actives</h6>
                      <h3 className="mb-0">{associations.filter(a => a.status === 'active').length}</h3>
                    </div>
                    <i className="bi bi-check-circle fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">En révision</h6>
                      <h3 className="mb-0">{associations.filter(a => a.status === 'under_review').length}</h3>
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
                      <h6 className="card-title">Suspendues</h6>
                      <h3 className="mb-0">{associations.filter(a => a.status === 'suspended').length}</h3>
                    </div>
                    <i className="bi bi-x-circle fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Associations Table */}
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Association</th>
                      <th>Président</th>
                      <th>Type</th>
                      <th>Région</th>
                      <th>Statut</th>
                      <th>Niveau de Risque</th>
                      <th>Dernière Inspection</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssociations.map(association => {
                      const statusBadge = getStatusBadge(association.status);
                      const riskBadge = getRiskBadge(association.riskLevel);

                      return (
                        <tr key={association.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-building"></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{association.name}</h6>
                                <small className="text-muted">{association.members} membres</small>
                              </div>
                            </div>
                          </td>
                          <td>{association.president}</td>
                          <td>{association.type}</td>
                          <td>{association.region}</td>
                          <td>
                            <span className={statusBadge.class}>
                              {statusBadge.text}
                            </span>
                          </td>
                          <td>
                            <span className={riskBadge.class}>
                              <i className={`${riskBadge.icon} me-1`}></i>
                              {riskBadge.text}
                            </span>
                          </td>
                          <td>
                            <small>{new Date(association.lastInspection).toLocaleDateString('fr-FR')}</small>
                            <br />
                            <small className={`text-${association.inspectionStatus === 'Conforme' ? 'success' : association.inspectionStatus === 'En cours de vérification' ? 'warning' : 'danger'}`}>
                              {association.inspectionStatus}
                            </small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleViewDetails(association)}
                                title="Voir détails"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-success"
                                title="Contacter"
                              >
                                <i className="bi bi-telephone"></i>
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                title="Nouvelle inspection"
                              >
                                <i className="bi bi-clipboard-check"></i>
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

          {filteredAssociations.length === 0 && !loading && (
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted"></i>
              <h5 className="mt-3">Aucune association trouvée</h5>
              <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Association Details */}
      {showModal && selectedAssociation && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-building me-2"></i>
                  {selectedAssociation.name}
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
                    <h6>Informations générales</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Président:</strong></td>
                          <td>{selectedAssociation.president}</td>
                        </tr>
                        <tr>
                          <td><strong>Type:</strong></td>
                          <td>{selectedAssociation.type}</td>
                        </tr>
                        <tr>
                          <td><strong>Date de création:</strong></td>
                          <td>{new Date(selectedAssociation.foundedDate).toLocaleDateString('fr-FR')}</td>
                        </tr>
                        <tr>
                          <td><strong>Membres:</strong></td>
                          <td>{selectedAssociation.members}</td>
                        </tr>
                        <tr>
                          <td><strong>Budget:</strong></td>
                          <td>{parseInt(selectedAssociation.budget).toLocaleString()} DH</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Contact</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Adresse:</strong></td>
                          <td>{selectedAssociation.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Téléphone:</strong></td>
                          <td>{selectedAssociation.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{selectedAssociation.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Région:</strong></td>
                          <td>{selectedAssociation.region}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-12">
                    <h6>Projets en cours</h6>
                    <ul className="list-group list-group-flush">
                      {selectedAssociation.projects.map((project, index) => (
                        <li key={index} className="list-group-item">
                          <i className="bi bi-arrow-right me-2"></i>
                          {project}
                        </li>
                      ))}
                    </ul>
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
                  <i className="bi bi-telephone me-1"></i>
                  Contacter
                </button>
                <button type="button" className="btn btn-warning">
                  <i className="bi bi-clipboard-check me-1"></i>
                  Programmer Inspection
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

export default AssociationsList;
