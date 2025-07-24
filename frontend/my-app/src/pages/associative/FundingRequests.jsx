const FundingRequests = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-cash-coin me-2"></i>
                Demandes de Financement
              </h2>
              <p className="text-muted mb-0">
                Gérer les demandes de financement
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-filter me-1"></i>
                Filtrer
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouvelle Demande
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-cash-coin display-1 text-muted mb-3"></i>
              <h4>Demandes de Financement</h4>
              <p className="text-muted">
                Cette page permettra de gérer les demandes de financement, les
                valider, suivre leur statut et gérer les budgets alloués.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-clock text-warning display-4"></i>
                      <h6 className="mt-2">En Attente</h6>
                      <small className="text-muted">Demandes à examiner</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-check-circle text-success display-4"></i>
                      <h6 className="mt-2">Approuvées</h6>
                      <small className="text-muted">Demandes validées</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-currency-dollar text-info display-4"></i>
                      <h6 className="mt-2">Budget Total</h6>
                      <small className="text-muted">Montant alloué</small>
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

export default FundingRequests;
