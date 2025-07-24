const ContactAssociation = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-telephone me-2"></i>
                Contacter Association
              </h2>
              <p className="text-muted mb-0">
                Communication avec les associations partenaires
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-gear me-1"></i>
                Configuration
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus me-1"></i>
                Nouveau
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-telephone display-1 text-muted mb-3"></i>
              <h4>Contacter Association</h4>
              <p className="text-muted">
                Communication avec les associations partenaires
              </p>
              <p className="text-muted">
                Cette fonctionnalité sera bientôt disponible avec toutes les
                options de gestion nécessaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAssociation;
