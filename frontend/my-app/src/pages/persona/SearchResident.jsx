const SearchResident = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-search me-2"></i>
                Rechercher Pensionnaire
              </h2>
              <p className="text-muted mb-0">
                Recherche avancée de pensionnaires
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-funnel me-1"></i>
                Filtres Avancés
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-download me-1"></i>
                Exporter Résultats
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-search display-1 text-muted mb-3"></i>
              <h4>Rechercher Pensionnaire</h4>
              <p className="text-muted">
                Cette page permettra d'effectuer des recherches avancées parmi
                les pensionnaires, avec des critères multiples et des filtres
                personnalisés.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-funnel text-primary display-4"></i>
                      <h6 className="mt-2">Filtres Multiples</h6>
                      <small className="text-muted">
                        Recherche par critères spécifiques
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-list-ul text-success display-4"></i>
                      <h6 className="mt-2">Résultats</h6>
                      <small className="text-muted">
                        Liste détaillée des correspondances
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-save text-info display-4"></i>
                      <h6 className="mt-2">Recherches Sauvées</h6>
                      <small className="text-muted">
                        Critères de recherche favoris
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

export default SearchResident;
