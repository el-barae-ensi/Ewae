const ManageResidents = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-people-fill me-2"></i>
                Gérer Pensionnaires
              </h2>
              <p className="text-muted mb-0">
                Gestion complète des pensionnaires
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-filter me-1"></i>
                Filtres
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-person-plus me-1"></i>
                Nouveau Pensionnaire
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-people-fill display-1 text-muted mb-3"></i>
              <h4>Gérer Pensionnaires</h4>
              <p className="text-muted">
                Cette page permettra de gérer l'ensemble des pensionnaires,
                leurs admissions, transferts, sorties et suivi médico-social.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-person-plus text-primary display-4"></i>
                      <h6 className="mt-2">Admissions</h6>
                      <small className="text-muted">
                        Nouvelles arrivées et intégration
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-arrow-left-right text-success display-4"></i>
                      <h6 className="mt-2">Transferts</h6>
                      <small className="text-muted">
                        Mouvements entre établissements
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-heart-pulse text-info display-4"></i>
                      <h6 className="mt-2">Suivi Médical</h6>
                      <small className="text-muted">
                        Santé et bien-être des pensionnaires
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

export default ManageResidents;
