const ActivityReports = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Rapports d'Activité
              </h2>
              <p className="text-muted mb-0">
                Générer et consulter les rapports d'activité
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-1"></i>
                Exporter
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau Rapport
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <i className="bi bi-file-text display-4"></i>
                  <h4 className="mt-2">24</h4>
                  <small>Rapports Générés</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <i className="bi bi-calendar-month display-4"></i>
                  <h4 className="mt-2">6</h4>
                  <small>Ce Mois</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <i className="bi bi-eye display-4"></i>
                  <h4 className="mt-2">156</h4>
                  <small>Consultations</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <i className="bi bi-clock display-4"></i>
                  <h4 className="mt-2">3</h4>
                  <small>En Cours</small>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-graph-up display-1 text-muted mb-3"></i>
              <h4>Rapports d'Activité et Suivi</h4>
              <p className="text-muted">
                Cette page permettra de générer des rapports d'activité
                détaillés, analyser les performances, suivre les objectifs et
                partager les résultats.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-bar-chart text-primary display-4"></i>
                      <h6 className="mt-2">Statistiques</h6>
                      <small className="text-muted">Analyse des données</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-target text-success display-4"></i>
                      <h6 className="mt-2">Objectifs</h6>
                      <small className="text-muted">Suivi des objectifs</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-share text-info display-4"></i>
                      <h6 className="mt-2">Partage</h6>
                      <small className="text-muted">
                        Diffusion des rapports
                      </small>
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

export default ActivityReports;
