const AddDonation = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-heart me-2"></i>
                Faire un Don
              </h2>
              <p className="text-muted mb-0">
                Effectuer une donation pour soutenir les associations
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-credit-card me-1"></i>
                Moyens de Paiement
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <i className="bi bi-currency-dollar display-4"></i>
                  <h4 className="mt-2">150K</h4>
                  <small>MAD Collectés</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <i className="bi bi-people display-4"></i>
                  <h4 className="mt-2">1,250</h4>
                  <small>Donateurs</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <i className="bi bi-heart display-4"></i>
                  <h4 className="mt-2">89</h4>
                  <small>Dons ce Mois</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up display-4"></i>
                  <h4 className="mt-2">25</h4>
                  <small>Associations Aidées</small>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-heart display-1 text-muted mb-3"></i>
              <h4>Faire un Don</h4>
              <p className="text-muted">
                Effectuer une donation pour soutenir les associations et leurs
                missions.
              </p>
              <p className="text-muted">
                Cette page permettra de faire des dons sécurisés par différents
                moyens de paiement, choisir l'association bénéficiaire et suivre
                l'impact de votre générosité.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-credit-card text-primary display-4"></i>
                      <h6 className="mt-2">Paiement Sécurisé</h6>
                      <small className="text-muted">
                        Transactions cryptées et sécurisées
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-receipt text-success display-4"></i>
                      <h6 className="mt-2">Reçu Fiscal</h6>
                      <small className="text-muted">
                        Déduction fiscale automatique
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-graph-up text-warning display-4"></i>
                      <h6 className="mt-2">Suivi Impact</h6>
                      <small className="text-muted">
                        Transparence sur l'utilisation des dons
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

export default AddDonation;
