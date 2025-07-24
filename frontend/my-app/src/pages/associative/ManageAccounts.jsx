const ManageAccounts = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-person-gear me-2"></i>
                Gestion des Comptes d'Association
              </h2>
              <p className="text-muted mb-0">
                Gérer les comptes des associations
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau Compte
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-person-gear display-1 text-muted mb-3"></i>
              <h4>Gestion des Comptes</h4>
              <p className="text-muted">
                Cette page permettra de gérer les comptes d'association,
                modifier les informations, gérer les accès et permissions.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-building text-primary display-4"></i>
                      <h6 className="mt-2">Comptes Association</h6>
                      <small className="text-muted">
                        Créer et modifier les comptes
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-shield-check text-success display-4"></i>
                      <h6 className="mt-2">Permissions</h6>
                      <small className="text-muted">
                        Gérer les droits d'accès
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-graph-up text-info display-4"></i>
                      <h6 className="mt-2">Statistiques</h6>
                      <small className="text-muted">Suivi des activités</small>
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

export default ManageAccounts;
