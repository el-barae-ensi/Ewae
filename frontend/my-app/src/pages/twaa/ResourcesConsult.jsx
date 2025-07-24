import React from "react";

const ResourcesConsult = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-collection me-2"></i>
                Consulter Ressources
              </h2>
              <p className="text-muted mb-0">
                Consultation des ressources disponibles
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-search me-1"></i>
                Rechercher Ressource
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-collection display-1 text-muted mb-3"></i>
              <h4>Consulter Ressources</h4>
              <p className="text-muted">
                Cette page permettra de consulter toutes les ressources
                disponibles, matérielles et humaines, avec leur statut
                d'utilisation et disponibilité.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-boxes text-primary display-4"></i>
                      <h6 className="mt-2">Inventaire</h6>
                      <small className="text-muted">
                        Ressources matérielles disponibles
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-people text-success display-4"></i>
                      <h6 className="mt-2">Personnel</h6>
                      <small className="text-muted">
                        Ressources humaines disponibles
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border">
                    <div className="card-body">
                      <i className="bi bi-calendar-check text-info display-4"></i>
                      <h6 className="mt-2">Planning</h6>
                      <small className="text-muted">
                        Planification des ressources
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

export default ResourcesConsult;
