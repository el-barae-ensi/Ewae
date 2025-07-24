import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ResidentsList = () => {
  const { user } = useAuth();
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [associationFilter, setAssociationFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [selectedResident, setSelectedResident] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for residents
  useEffect(() => {
    const mockResidents = [
      {
        id: 1,
        firstName: "Ahmed",
        lastName: "Benali",
        fullName: "Ahmed Benali",
        dateOfBirth: "1985-03-15",
        age: 39,
        gender: "Masculin",
        nationalId: "KB123456",
        status: "active",
        association: "Association Al Amal",
        entryDate: "2023-01-15",
        address: "Quartier Al Andalous, Rabat",
        phone: "+212 661 234 567",
        emergencyContact: "Fatima Benali (+212 662 345 678)",
        medicalConditions: ["Diabète", "Hypertension"],
        medications: ["Metformine", "Lisinopril"],
        socialWorker: "Dr. Laila Amrani",
        notes: "Nécessite un suivi médical régulier",
        riskLevel: "medium",
        photo: null,
        documents: ["Carte d'identité", "Certificat médical", "Autorisation de séjour"]
      },
      {
        id: 2,
        firstName: "Khadija",
        lastName: "Tazi",
        fullName: "Khadija Tazi",
        dateOfBirth: "1978-09-22",
        age: 45,
        gender: "Féminin",
        nationalId: "KC987654",
        status: "active",
        association: "Fondation Espoir",
        entryDate: "2022-11-08",
        address: "Hay Mohammadi, Casablanca",
        phone: "+212 663 456 789",
        emergencyContact: "Omar Tazi (+212 664 567 890)",
        medicalConditions: ["Asthme"],
        medications: ["Ventoline"],
        socialWorker: "Mme. Aicha Semlali",
        notes: "Participe activement aux activités culturelles",
        riskLevel: "low",
        photo: null,
        documents: ["Carte d'identité", "Certificat médical"]
      },
      {
        id: 3,
        firstName: "Mohamed",
        lastName: "Alaoui",
        fullName: "Mohamed Alaoui",
        dateOfBirth: "1960-12-10",
        age: 63,
        gender: "Masculin",
        nationalId: "KA246810",
        status: "under_observation",
        association: "Association Jeunesse Active",
        entryDate: "2023-08-20",
        address: "Médina, Marrakech",
        phone: "+212 665 789 012",
        emergencyContact: "Aicha Alaoui (+212 666 890 123)",
        medicalConditions: ["Arthrite", "Troubles du sommeil"],
        medications: ["Ibuprofène", "Zolpidem"],
        socialWorker: "M. Youssef Benkirane",
        notes: "Adaptation difficile, nécessite un accompagnement psychologique",
        riskLevel: "high",
        photo: null,
        documents: ["Carte d'identité", "Rapport psychologique", "Certificat médical"]
      },
      {
        id: 4,
        firstName: "Fatima",
        lastName: "Ouali",
        fullName: "Fatima Ouali",
        dateOfBirth: "1992-06-05",
        age: 32,
        gender: "Féminin",
        nationalId: "KF135792",
        status: "active",
        association: "Centre de Développement Local",
        entryDate: "2024-01-10",
        address: "Quartier Administratif, Tanger",
        phone: "+212 667 123 456",
        emergencyContact: "Hassan Ouali (+212 668 234 567)",
        medicalConditions: ["Aucune condition particulière"],
        medications: [],
        socialWorker: "Mme. Samira Idrissi",
        notes: "Nouvelle arrivée, s'intègre bien",
        riskLevel: "low",
        photo: null,
        documents: ["Carte d'identité", "Certificat de bonne conduite"]
      },
      {
        id: 5,
        firstName: "Abdelkader",
        lastName: "Benjelloun",
        fullName: "Abdelkader Benjelloun",
        dateOfBirth: "1970-04-18",
        age: 54,
        gender: "Masculin",
        nationalId: "KB864209",
        status: "discharged",
        association: "Association Solidarité",
        entryDate: "2022-05-15",
        dischargeDate: "2024-01-30",
        address: "Ville Nouvelle, Fès",
        phone: "+212 669 345 678",
        emergencyContact: "Malika Benjelloun (+212 670 456 789)",
        medicalConditions: ["Dépression"],
        medications: ["Sertraline"],
        socialWorker: "Dr. Rachid Benali",
        notes: "Réinsertion réussie, suivi externe",
        riskLevel: "low",
        photo: null,
        documents: ["Carte d'identité", "Rapport de sortie", "Plan de suivi"]
      }
    ];

    setTimeout(() => {
      setResidents(mockResidents);
      setFilteredResidents(mockResidents);
      setLoading(false);
    }, 1200);
  }, []);

  // Filter residents based on search and filters
  useEffect(() => {
    let filtered = residents;

    if (searchTerm) {
      filtered = filtered.filter(resident =>
        resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.association.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(resident => resident.status === statusFilter);
    }

    if (associationFilter !== 'all') {
      filtered = filtered.filter(resident => resident.association === associationFilter);
    }

    if (ageFilter !== 'all') {
      filtered = filtered.filter(resident => {
        const age = resident.age;
        switch (ageFilter) {
          case 'young': return age < 35;
          case 'middle': return age >= 35 && age < 55;
          case 'senior': return age >= 55;
          default: return true;
        }
      });
    }

    setFilteredResidents(filtered);
  }, [searchTerm, statusFilter, associationFilter, ageFilter, residents]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'badge bg-success', text: 'Actif', icon: 'bi-check-circle' },
      under_observation: { class: 'badge bg-warning', text: 'Sous observation', icon: 'bi-eye' },
      discharged: { class: 'badge bg-info', text: 'Sorti', icon: 'bi-box-arrow-right' },
      suspended: { class: 'badge bg-danger', text: 'Suspendu', icon: 'bi-pause-circle' }
    };
    return statusConfig[status] || { class: 'badge bg-secondary', text: status, icon: 'bi-question-circle' };
  };

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      low: { class: 'badge bg-success', text: 'Faible', icon: 'bi-shield-check' },
      medium: { class: 'badge bg-warning', text: 'Moyen', icon: 'bi-shield-exclamation' },
      high: { class: 'badge bg-danger', text: 'Élevé', icon: 'bi-shield-x' }
    };
    return riskConfig[riskLevel] || { class: 'badge bg-secondary', text: riskLevel, icon: 'bi-shield' };
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewDetails = (resident) => {
    setSelectedResident(resident);
    setShowModal(true);
  };

  const associations = [...new Set(residents.map(r => r.association))];

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
                <i className="bi bi-people me-2"></i>
                Pensionnaires
              </h2>
              <p className="text-muted mb-0">Gestion et suivi des pensionnaires</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau Pensionnaire
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
                      placeholder="Nom, ID, association..."
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
                    <option value="active">Actif</option>
                    <option value="under_observation">Sous observation</option>
                    <option value="discharged">Sorti</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Association</label>
                  <select
                    className="form-select"
                    value={associationFilter}
                    onChange={(e) => setAssociationFilter(e.target.value)}
                  >
                    <option value="all">Toutes</option>
                    {associations.map(association => (
                      <option key={association} value={association}>{association}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Âge</label>
                  <select
                    className="form-select"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="young">&lt; 35 ans</option>
                    <option value="middle">35-55 ans</option>
                    <option value="senior">&gt; 55 ans</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setAssociationFilter('all');
                      setAgeFilter('all');
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
                      <h3 className="mb-0">{residents.length}</h3>
                    </div>
                    <i className="bi bi-people fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Actifs</h6>
                      <h3 className="mb-0">{residents.filter(r => r.status === 'active').length}</h3>
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
                      <h6 className="card-title">Sous observation</h6>
                      <h3 className="mb-0">{residents.filter(r => r.status === 'under_observation').length}</h3>
                    </div>
                    <i className="bi bi-eye fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-title">Sortis</h6>
                      <h3 className="mb-0">{residents.filter(r => r.status === 'discharged').length}</h3>
                    </div>
                    <i className="bi bi-box-arrow-right fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Residents Table */}
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Pensionnaire</th>
                      <th>ID National</th>
                      <th>Association</th>
                      <th>Statut</th>
                      <th>Niveau de Risque</th>
                      <th>Travailleur Social</th>
                      <th>Date d'entrée</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResidents.map(resident => {
                      const statusBadge = getStatusBadge(resident.status);
                      const riskBadge = getRiskBadge(resident.riskLevel);

                      return (
                        <tr key={resident.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar bg-secondary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-person"></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{resident.fullName}</h6>
                                <small className="text-muted">
                                  {resident.age} ans • {resident.gender}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <code>{resident.nationalId}</code>
                          </td>
                          <td>
                            <small>{resident.association}</small>
                          </td>
                          <td>
                            <span className={statusBadge.class}>
                              <i className={`${statusBadge.icon} me-1`}></i>
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
                            <small>{resident.socialWorker}</small>
                          </td>
                          <td>
                            <small>{new Date(resident.entryDate).toLocaleDateString('fr-FR')}</small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleViewDetails(resident)}
                                title="Voir détails"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-success"
                                title="Dossier médical"
                              >
                                <i className="bi bi-heart-pulse"></i>
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                title="Modifier"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-outline-info"
                                title="Générer rapport"
                              >
                                <i className="bi bi-file-text"></i>
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

          {filteredResidents.length === 0 && !loading && (
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted"></i>
              <h5 className="mt-3">Aucun pensionnaire trouvé</h5>
              <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Resident Details */}
      {showModal && selectedResident && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person me-2"></i>
                  Dossier de {selectedResident.fullName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Informations personnelles</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Nom complet:</strong></td>
                          <td>{selectedResident.fullName}</td>
                        </tr>
                        <tr>
                          <td><strong>Date de naissance:</strong></td>
                          <td>{new Date(selectedResident.dateOfBirth).toLocaleDateString('fr-FR')}</td>
                        </tr>
                        <tr>
                          <td><strong>Âge:</strong></td>
                          <td>{selectedResident.age} ans</td>
                        </tr>
                        <tr>
                          <td><strong>Genre:</strong></td>
                          <td>{selectedResident.gender}</td>
                        </tr>
                        <tr>
                          <td><strong>ID National:</strong></td>
                          <td><code>{selectedResident.nationalId}</code></td>
                        </tr>
                        <tr>
                          <td><strong>Téléphone:</strong></td>
                          <td>{selectedResident.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Contact d'urgence:</strong></td>
                          <td>{selectedResident.emergencyContact}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-4">
                    <h6>Informations de séjour</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Association:</strong></td>
                          <td>{selectedResident.association}</td>
                        </tr>
                        <tr>
                          <td><strong>Date d'entrée:</strong></td>
                          <td>{new Date(selectedResident.entryDate).toLocaleDateString('fr-FR')}</td>
                        </tr>
                        {selectedResident.dischargeDate && (
                          <tr>
                            <td><strong>Date de sortie:</strong></td>
                            <td>{new Date(selectedResident.dischargeDate).toLocaleDateString('fr-FR')}</td>
                          </tr>
                        )}
                        <tr>
                          <td><strong>Statut:</strong></td>
                          <td>
                            <span className={getStatusBadge(selectedResident.status).class}>
                              {getStatusBadge(selectedResident.status).text}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Niveau de risque:</strong></td>
                          <td>
                            <span className={getRiskBadge(selectedResident.riskLevel).class}>
                              {getRiskBadge(selectedResident.riskLevel).text}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Travailleur social:</strong></td>
                          <td>{selectedResident.socialWorker}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-4">
                    <h6>Informations médicales</h6>
                    <div className="mb-3">
                      <strong>Conditions médicales:</strong>
                      {selectedResident.medicalConditions.length > 0 ? (
                        <ul className="list-unstyled mt-1">
                          {selectedResident.medicalConditions.map((condition, index) => (
                            <li key={index} className="small">
                              <i className="bi bi-dot text-danger"></i>
                              {condition}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="small text-muted mt-1">Aucune condition particulière</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <strong>Médicaments:</strong>
                      {selectedResident.medications.length > 0 ? (
                        <ul className="list-unstyled mt-1">
                          {selectedResident.medications.map((medication, index) => (
                            <li key={index} className="small">
                              <i className="bi bi-capsule text-primary"></i>
                              {medication}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="small text-muted mt-1">Aucun médicament</p>
                      )}
                    </div>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Adresse</h6>
                    <p className="text-muted">{selectedResident.address}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Notes</h6>
                    <p className="text-muted">{selectedResident.notes}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-12">
                    <h6>Documents</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedResident.documents.map((document, index) => (
                        <span key={index} className="badge bg-light text-dark border">
                          <i className="bi bi-file-earmark me-1"></i>
                          {document}
                        </span>
                      ))}
                    </div>
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
                <button type="button" className="btn btn-success">
                  <i className="bi bi-heart-pulse me-1"></i>
                  Dossier Médical
                </button>
                <button type="button" className="btn btn-warning">
                  <i className="bi bi-pencil me-1"></i>
                  Modifier
                </button>
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
    </div>
  );
};

export default ResidentsList;
