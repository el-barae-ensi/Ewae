const ConsultPerson = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-person-check me-2"></i>
                Consulter Personne
              </h2>
              <p className="text-muted mb-0">
                Consulter les informations d'une personne
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-search me-1"></i>
                Rechercher
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-person-check display-1 text-muted mb-3"></i>
              <h4>Consulter Personne</h4>
              <p className="text-muted">
                Cette page permettra de consulter les informations détaillées
                d'une personne, son historique, ses documents et son statut
                actuel.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-person text-primary display-4"></i>
                      <h6 className="mt-2">Informations Personnelles</h6>
                      <small className="text-muted">
                        Données de base de la personne
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-file-text text-success display-4"></i>
                      <h6 className="mt-2">Documents</h6>
                      <small className="text-muted">
                        Pièces justificatives et dossiers
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-clock-history text-info display-4"></i>
                      <h6 className="mt-2">Historique</h6>
                      <small className="text-muted">
                        Suivi des activités et événements
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

export default ConsultPerson;
