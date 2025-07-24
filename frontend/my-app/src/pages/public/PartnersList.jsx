const PartnersList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-handshake me-2"></i>
                Liste des Partenaires
              </h2>
              <p className="text-muted mb-0">
                Consulter la liste des partenaires et organisations
              </p>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-primary">
                <i className="bi bi-search me-1"></i>
                Rechercher
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <i className="bi bi-building display-4"></i>
                  <h4 className="mt-2">25</h4>
                  <small>Associations</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <i className="bi bi-hospital display-4"></i>
                  <h4 className="mt-2">8</h4>
                  <small>Centres Médicaux</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <i className="bi bi-mortarboard display-4"></i>
                  <h4 className="mt-2">12</h4>
                  <small>Instituts Éducatifs</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <i className="bi bi-handshake display-4"></i>
                  <h4 className="mt-2">45</h4>
                  <small>Total Partenaires</small>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-handshake display-1 text-muted mb-3"></i>
              <h4>Liste des Partenaires</h4>
              <p className="text-muted">
                Consulter la liste des partenaires et organisations
                collaboratrices.
              </p>
              <p className="text-muted">
                Cette page affichera tous les partenaires officiels, leurs
                coordonnées, domaines d'intervention et services offerts.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-geo-alt text-primary display-4"></i>
                      <h6 className="mt-2">Localisation</h6>
                      <small className="text-muted">
                        Carte interactive des partenaires
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-telephone text-success display-4"></i>
                      <h6 className="mt-2">Contact Direct</h6>
                      <small className="text-muted">
                        Coordonnées et horaires
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-star text-warning display-4"></i>
                      <h6 className="mt-2">Services</h6>
                      <small className="text-muted">
                        Domaines d'intervention
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

export default PartnersList;
