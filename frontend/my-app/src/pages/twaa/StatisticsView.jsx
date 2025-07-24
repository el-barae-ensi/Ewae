import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StatisticsView = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('month');
  const [stats, setStats] = useState({
    totalDonations: 485000,
    totalAssociations: 45,
    totalResidents: 1250,
    activeAlerts: 8,
    monthlyGrowth: 12.5,
    satisfactionRate: 94.2
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const chartData = {
    donations: [
      { month: 'Jan', amount: 35000 },
      { month: 'Fév', amount: 42000 },
      { month: 'Mar', amount: 38000 },
      { month: 'Avr', amount: 45000 },
      { month: 'Mai', amount: 52000 },
      { month: 'Juin', amount: 48000 }
    ],
    associations: [
      { category: 'Aide Sociale', count: 15, percentage: 33.3 },
      { category: 'Éducation', count: 12, percentage: 26.7 },
      { category: 'Santé', count: 8, percentage: 17.8 },
      { category: 'Culture', count: 6, percentage: 13.3 },
      { category: 'Sport', count: 4, percentage: 8.9 }
    ]
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
                <i className="bi bi-bar-chart me-2"></i>
                Tableau de Bord Statistiques
              </h2>
              <p className="text-muted mb-0">Vue d'ensemble des données et métriques système</p>
            </div>
            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-gear me-1"></i>
                Paramètres
              </button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="row mb-4">
            <div className="col-md-2">
              <div className="card bg-primary text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-currency-dollar display-6"></i>
                  <h5 className="mt-2 mb-1">{(stats.totalDonations / 1000).toFixed(0)}K MAD</h5>
                  <small>Total Donations</small>
                  <div className="mt-1">
                    <small className="badge bg-light text-primary">
                      <i className="bi bi-arrow-up"></i> +{stats.monthlyGrowth}%
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-success text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-building display-6"></i>
                  <h5 className="mt-2 mb-1">{stats.totalAssociations}</h5>
                  <small>Associations</small>
                  <div className="mt-1">
                    <small className="badge bg-light text-success">Actives</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-info text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-people display-6"></i>
                  <h5 className="mt-2 mb-1">{stats.totalResidents.toLocaleString()}</h5>
                  <small>Pensionnaires</small>
                  <div className="mt-1">
                    <small className="badge bg-light text-info">Pris en charge</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-warning text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-exclamation-triangle display-6"></i>
                  <h5 className="mt-2 mb-1">{stats.activeAlerts}</h5>
                  <small>Alertes Actives</small>
                  <div className="mt-1">
                    <small className="badge bg-light text-warning">En cours</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-secondary text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-graph-up display-6"></i>
                  <h5 className="mt-2 mb-1">{stats.satisfactionRate}%</h5>
                  <small>Satisfaction</small>
                  <div className="mt-1">
                    <small className="badge bg-light text-secondary">Moyenne</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-dark text-white h-100">
                <div className="card-body text-center py-3">
                  <i className="bi bi-clock display-6"></i>
                  <h5 className="mt-2 mb-1">24/7</h5>
                  <small>Surveillance</small>
                  <div className="mt-1">
                    <small className="badge bg-success">En ligne</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Donations Chart */}
            <div className="col-md-8">
              <div className="card h-100">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-graph-up me-2"></i>
                    Évolution des Donations
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-container" style={{ height: '300px' }}>
                    {/* Simple bar chart representation */}
                    <div className="d-flex align-items-end justify-content-between h-100 px-3">
                      {chartData.donations.map((item, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="bg-primary mx-auto mb-2"
                            style={{
                              width: '40px',
                              height: `${(item.amount / 60000) * 250}px`,
                              borderRadius: '4px 4px 0 0'
                            }}
                          ></div>
                          <small className="text-muted">{item.month}</small>
                          <div><small className="fw-bold">{(item.amount / 1000).toFixed(0)}K</small></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Associations by Category */}
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-pie-chart me-2"></i>
                    Associations par Catégorie
                  </h6>
                </div>
                <div className="card-body">
                  {chartData.associations.map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="fw-medium">{item.category}</small>
                        <small className="text-muted">{item.count}</small>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className={`progress-bar ${
                            index % 5 === 0 ? 'bg-primary' :
                            index % 5 === 1 ? 'bg-success' :
                            index % 5 === 2 ? 'bg-info' :
                            index % 5 === 3 ? 'bg-warning' : 'bg-secondary'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <small className="text-muted">{item.percentage}%</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-activity me-2"></i>
                    Activité Récente
                  </h6>
                </div>
                <div className="card-body">
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-marker bg-success"></div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between">
                          <strong>Nouvelle donation reçue</strong>
                          <small className="text-muted">Il y a 2 heures</small>
                        </div>
                        <p className="text-muted mb-0">Don de 5,000 MAD pour l'Association Al Amal</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker bg-warning"></div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between">
                          <strong>Alerte système générée</strong>
                          <small className="text-muted">Il y a 4 heures</small>
                        </div>
                        <p className="text-muted mb-0">Correspondance suspecte détectée - Pensionnaire ID: 1247</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker bg-info"></div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between">
                          <strong>Rapport mensuel généré</strong>
                          <small className="text-muted">Il y a 6 heures</small>
                        </div>
                        <p className="text-muted mb-0">Rapport d'activité pour la région Rabat-Salé-Kénitra</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker bg-primary"></div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between">
                          <strong>Nouvelle association enregistrée</strong>
                          <small className="text-muted">Hier</small>
                        </div>
                        <p className="text-muted mb-0">Association "Espoir Jeunesse" ajoutée au système</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for timeline */}
      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #dee2e6;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 20px;
        }
        .timeline-marker {
          position: absolute;
          left: -23px;
          top: 5px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 2px #dee2e6;
        }
        .timeline-content {
          padding: 10px 15px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default StatisticsView;
