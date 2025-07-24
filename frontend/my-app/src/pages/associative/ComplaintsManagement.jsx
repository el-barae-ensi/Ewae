const ComplaintsManagement = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-flag me-2"></i>
                Plaintes et Signalements
              </h2>
              <p className="text-muted mb-0">
                Gérer les plaintes et signalements reçus
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-filter me-1"></i>
                Filtrer
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau Signalement
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <i className="bi bi-exclamation-triangle display-4"></i>
                  <h4 className="mt-2">12</h4>
                  <small>Plaintes Ouvertes</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <i className="bi bi-clock display-4"></i>
                  <h4 className="mt-2">8</h4>
                  <small>En Cours</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <i className="bi bi-check-circle display-4"></i>
                  <h4 className="mt-2">45</h4>
                  <small>Résolues</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <i className="bi bi-flag display-4"></i>
                  <h4 className="mt-2">65</h4>
                  <small>Total</small>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-flag display-1 text-muted mb-3"></i>
              <h4>Gestion des Plaintes et Signalements</h4>
              <p className="text-muted">
                Cette page permettra de gérer les plaintes et signalements
                reçus, les traiter, assigner à des responsables et suivre leur
                résolution.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-inbox text-primary display-4"></i>
                      <h6 className="mt-2">Nouvelles Plaintes</h6>
                      <small className="text-muted">
                        Plaintes non traitées
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-person-check text-warning display-4"></i>
                      <h6 className="mt-2">Assignation</h6>
                      <small className="text-muted">Assigner aux équipes</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-clipboard-check text-success display-4"></i>
                      <h6 className="mt-2">Suivi</h6>
                      <small className="text-muted">Suivre la résolution</small>
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

export default ComplaintsManagement;
