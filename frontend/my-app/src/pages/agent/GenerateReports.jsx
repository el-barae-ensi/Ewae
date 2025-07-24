import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const GenerateReports = () => {
  const { user } = useAuth();
  const [reportType, setReportType] = useState('associations');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [filters, setFilters] = useState({
    region: 'all',
    status: 'all',
    riskLevel: 'all',
    association: 'all'
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  // Mock data for recent reports
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        title: "Rapport mensuel - Associations Rabat-Salé-Kénitra",
        type: "associations",
        format: "pdf",
        createdDate: "2024-02-15",
        createdBy: "Agent Ahmed Bennani",
        status: "completed",
        fileSize: "2.3 MB",
        downloadUrl: "#",
        description: "Analyse complète des associations de la région",
        records: 45,
        period: "Janvier 2024"
      },
      {
        id: 2,
        title: "Rapport de surveillance - Pensionnaires à risque",
        type: "residents",
        format: "excel",
        createdDate: "2024-02-10",
        createdBy: "Agent Fatima Alaoui",
        status: "completed",
        fileSize: "890 KB",
        downloadUrl: "#",
        description: "Liste des pensionnaires nécessitant une surveillance accrue",
        records: 12,
        period: "Février 2024"
      },
      {
        id: 3,
        title: "Rapport d'inspection - Associations non conformes",
        type: "inspections",
        format: "pdf",
        createdDate: "2024-02-08",
        createdBy: "Agent Omar Tazi",
        status: "completed",
        fileSize: "1.7 MB",
        downloadUrl: "#",
        description: "Associations ayant des irrégularités identifiées",
        records: 8,
        period: "Janvier 2024"
      },
      {
        id: 4,
        title: "Rapport statistique - Vue d'ensemble Q1 2024",
        type: "statistics",
        format: "pdf",
        createdDate: "2024-02-01",
        createdBy: "Agent Khadija Semlali",
        status: "processing",
        fileSize: "Génération...",
        downloadUrl: null,
        description: "Statistiques globales du premier trimestre",
        records: 0,
        period: "Q1 2024"
      },
      {
        id: 5,
        title: "Rapport de communication - Échanges avec associations",
        type: "communications",
        format: "excel",
        createdDate: "2024-01-28",
        createdBy: "Agent Laila Benkirane",
        status: "completed",
        fileSize: "654 KB",
        downloadUrl: "#",
        description: "Historique des communications et réponses",
        records: 87,
        period: "Janvier 2024"
      }
    ];

    setRecentReports(mockReports);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReport = async () => {
    setGeneratingReport(true);

    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: recentReports.length + 1,
        title: getReportTitle(),
        type: reportType,
        format: reportFormat,
        createdDate: new Date().toISOString().split('T')[0],
        createdBy: user.name,
        status: "completed",
        fileSize: "1.2 MB",
        downloadUrl: "#",
        description: getReportDescription(),
        records: Math.floor(Math.random() * 100) + 10,
        period: `${dateRange.startDate} - ${dateRange.endDate}`
      };

      setRecentReports([newReport, ...recentReports]);
      setGeneratingReport(false);

      // Show success notification
      alert('Rapport généré avec succès!');
    }, 3000);
  };

  const getReportTitle = () => {
    const types = {
      associations: "Rapport des Associations",
      residents: "Rapport des Pensionnaires",
      inspections: "Rapport d'Inspections",
      statistics: "Rapport Statistique",
      communications: "Rapport de Communications"
    };
    return types[reportType] || "Rapport Personnalisé";
  };

  const getReportDescription = () => {
    const descriptions = {
      associations: "Analyse détaillée des associations selon les critères sélectionnés",
      residents: "Rapport complet sur les pensionnaires et leur statut",
      inspections: "Synthèse des inspections et leurs résultats",
      statistics: "Données statistiques et analyses de tendances",
      communications: "Historique des communications et interactions"
    };
    return descriptions[reportType] || "Rapport personnalisé selon vos critères";
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'badge bg-success', text: 'Terminé', icon: 'bi-check-circle' },
      processing: { class: 'badge bg-warning', text: 'En cours', icon: 'bi-clock' },
      failed: { class: 'badge bg-danger', text: 'Échec', icon: 'bi-x-circle' }
    };
    return statusConfig[status] || { class: 'badge bg-secondary', text: status, icon: 'bi-question' };
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      associations: 'bi-building',
      residents: 'bi-people',
      inspections: 'bi-clipboard-check',
      statistics: 'bi-graph-up',
      communications: 'bi-chat-dots'
    };
    return typeIcons[type] || 'bi-file-text';
  };

  const getFormatIcon = (format) => {
    const formatIcons = {
      pdf: 'bi-file-pdf',
      excel: 'bi-file-excel',
      word: 'bi-file-word',
      csv: 'bi-filetype-csv'
    };
    return formatIcons[format] || 'bi-file';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                Génération de Rapports
              </h2>
              <p className="text-muted mb-0">Créer et télécharger des rapports personnalisés</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-clock-history me-1"></i>
                Historique
              </button>
              <button className="btn btn-outline-info">
                <i className="bi bi-gear me-1"></i>
                Modèles
              </button>
            </div>
          </div>

          <div className="row">
            {/* Report Configuration */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-gear me-2"></i>
                    Configuration du Rapport
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Type de Rapport</label>
                    <select
                      className="form-select"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <option value="associations">Associations</option>
                      <option value="residents">Pensionnaires</option>
                      <option value="inspections">Inspections</option>
                      <option value="statistics">Statistiques</option>
                      <option value="communications">Communications</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Format de Sortie</label>
                    <select
                      className="form-select"
                      value={reportFormat}
                      onChange={(e) => setReportFormat(e.target.value)}
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="word">Word</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Période</label>
                    <div className="row g-2">
                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          placeholder="Date début"
                          value={dateRange.startDate}
                          onChange={(e) => handleDateChange('startDate', e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          placeholder="Date fin"
                          value={dateRange.endDate}
                          onChange={(e) => handleDateChange('endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <h6 className="mb-3">Filtres</h6>

                  <div className="mb-3">
                    <label className="form-label">Région</label>
                    <select
                      className="form-select form-select-sm"
                      value={filters.region}
                      onChange={(e) => handleFilterChange('region', e.target.value)}
                    >
                      <option value="all">Toutes les régions</option>
                      <option value="rabat">Rabat-Salé-Kénitra</option>
                      <option value="casablanca">Casablanca-Settat</option>
                      <option value="marrakech">Marrakech-Safi</option>
                      <option value="fes">Fès-Meknès</option>
                      <option value="tanger">Tanger-Tétouan-Al Hoceima</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Statut</label>
                    <select
                      className="form-select form-select-sm"
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="suspended">Suspendu</option>
                      <option value="under_review">En révision</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Niveau de Risque</label>
                    <select
                      className="form-select form-select-sm"
                      value={filters.riskLevel}
                      onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                    >
                      <option value="all">Tous les niveaux</option>
                      <option value="low">Faible</option>
                      <option value="medium">Moyen</option>
                      <option value="high">Élevé</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={generateReport}
                    disabled={generatingReport || !dateRange.startDate || !dateRange.endDate}
                  >
                    {generatingReport ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Génération...</span>
                        </div>
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Générer le Rapport
                      </>
                    )}
                  </button>

                  {(!dateRange.startDate || !dateRange.endDate) && (
                    <small className="text-muted d-block mt-2">
                      Veuillez sélectionner une période
                    </small>
                  )}
                </div>
              </div>

              {/* Quick Templates */}
              <div className="card mt-3">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-lightning me-2"></i>
                    Modèles Rapides
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-calendar-week me-1"></i>
                      Rapport Hebdomadaire
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="bi bi-calendar-month me-1"></i>
                      Rapport Mensuel
                    </button>
                    <button className="btn btn-outline-info btn-sm">
                      <i className="bi bi-calendar-range me-1"></i>
                      Rapport Trimestriel
                    </button>
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      Rapport d'Urgence
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-file-earmark-check me-2"></i>
                    Rapports Récents
                  </h5>
                  <div className="d-flex gap-2">
                    <div className="input-group input-group-sm" style={{ width: '250px' }}>
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un rapport..."
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Rapport</th>
                          <th>Type</th>
                          <th>Format</th>
                          <th>Créé le</th>
                          <th>Statut</th>
                          <th>Taille</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentReports.map(report => {
                          const statusBadge = getStatusBadge(report.status);

                          return (
                            <tr key={report.id}>
                              <td>
                                <div>
                                  <h6 className="mb-1">{report.title}</h6>
                                  <small className="text-muted">{report.description}</small>
                                </div>
                              </td>
                              <td>
                                <span className="badge bg-light text-dark">
                                  <i className={`bi ${getTypeIcon(report.type)} me-1`}></i>
                                  {report.type}
                                </span>
                              </td>
                              <td>
                                <i className={`bi ${getFormatIcon(report.format)} me-1`}></i>
                                {report.format.toUpperCase()}
                              </td>
                              <td>
                                <small>
                                  {new Date(report.createdDate).toLocaleDateString('fr-FR')}
                                  <br />
                                  <span className="text-muted">{report.createdBy}</span>
                                </small>
                              </td>
                              <td>
                                <span className={statusBadge.class}>
                                  <i className={`${statusBadge.icon} me-1`}></i>
                                  {statusBadge.text}
                                </span>
                              </td>
                              <td>
                                <small>{report.fileSize}</small>
                                {report.records > 0 && (
                                  <>
                                    <br />
                                    <small className="text-muted">{report.records} enregistrements</small>
                                  </>
                                )}
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  {report.status === 'completed' && report.downloadUrl && (
                                    <a
                                      href={report.downloadUrl}
                                      className="btn btn-outline-primary"
                                      title="Télécharger"
                                    >
                                      <i className="bi bi-download"></i>
                                    </a>
                                  )}
                                  <button
                                    className="btn btn-outline-info"
                                    title="Voir détails"
                                  >
                                    <i className="bi bi-eye"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-secondary"
                                    title="Dupliquer"
                                  >
                                    <i className="bi bi-files"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-danger"
                                    title="Supprimer"
                                  >
                                    <i className="bi bi-trash"></i>
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

              {/* Statistics */}
              <div className="row mt-4">
                <div className="col-md-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                      <i className="bi bi-file-earmark-text display-4"></i>
                      <h4 className="mt-2">{recentReports.length}</h4>
                      <small>Rapports Générés</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <i className="bi bi-check-circle display-4"></i>
                      <h4 className="mt-2">{recentReports.filter(r => r.status === 'completed').length}</h4>
                      <small>Terminés</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning text-white">
                    <div className="card-body text-center">
                      <i className="bi bi-clock display-4"></i>
                      <h4 className="mt-2">{recentReports.filter(r => r.status === 'processing').length}</h4>
                      <small>En Cours</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <i className="bi bi-download display-4"></i>
                      <h4 className="mt-2">
                        {recentReports.reduce((total, r) => total + (r.records || 0), 0)}
                      </h4>
                      <small>Enregistrements</small>
                    </div>
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

export default GenerateReports;
