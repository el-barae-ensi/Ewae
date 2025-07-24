import { useState } from "react";

const AddDeclaration = () => {
  const [formData, setFormData] = useState({
    type: "missing_person",
    title: "",
    description: "",
    personName: "",
    personAge: "",
    personGender: "",
    lastSeenDate: "",
    lastSeenLocation: "",
    contactPhone: "",
    contactEmail: "",
    urgency: "medium",
    category: "general",
    attachments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const declarationTypes = [
    {
      value: "missing_person",
      label: "Personne disparue",
      icon: "bi-person-x",
    },
    {
      value: "suspicious_activity",
      label: "Activité suspecte",
      icon: "bi-exclamation-triangle",
    },
    {
      value: "welfare_concern",
      label: "Préoccupation sociale",
      icon: "bi-heart",
    },
    {
      value: "information",
      label: "Information générale",
      icon: "bi-info-circle",
    },
    { value: "complaint", label: "Plainte", icon: "bi-flag" },
    {
      value: "assistance_request",
      label: "Demande d'aide",
      icon: "bi-hand-thumbs-up",
    },
  ];

  const urgencyLevels = [
    { value: "low", label: "Faible", color: "success" },
    { value: "medium", label: "Moyenne", color: "warning" },
    { value: "high", label: "Élevée", color: "danger" },
    { value: "urgent", label: "Urgent", color: "danger" },
  ];

  const categories = [
    { value: "general", label: "Général" },
    { value: "family", label: "Famille" },
    { value: "health", label: "Santé" },
    { value: "security", label: "Sécurité" },
    { value: "legal", label: "Juridique" },
    { value: "social", label: "Social" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (formData.type === "missing_person") {
      if (!formData.personName.trim()) {
        newErrors.personName = "Le nom de la personne est requis";
      }
      if (!formData.lastSeenDate) {
        newErrors.lastSeenDate = "La date de dernière observation est requise";
      }
      if (!formData.lastSeenLocation.trim()) {
        newErrors.lastSeenLocation =
          "Le lieu de dernière observation est requis";
      }
    }

    if (!formData.contactPhone.trim() && !formData.contactEmail.trim()) {
      newErrors.contact = "Au moins un moyen de contact est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would normally send the data to your API
      console.log("Declaration submitted:", formData);

      setSubmitted(true);

      // Reset form
      setFormData({
        type: "missing_person",
        title: "",
        description: "",
        personName: "",
        personAge: "",
        personGender: "",
        lastSeenDate: "",
        lastSeenLocation: "",
        contactPhone: "",
        contactEmail: "",
        urgency: "medium",
        category: "general",
        attachments: [],
      });
    } catch (error) {
      console.error("Error submitting declaration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-success">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill display-1 text-success"></i>
                </div>
                <h3 className="text-success mb-3">
                  Déclaration envoyée avec succès!
                </h3>
                <p className="text-muted mb-4">
                  Votre déclaration a été enregistrée et sera traitée dans les
                  plus brefs délais. Vous recevrez une confirmation par email
                  avec un numéro de suivi.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    <i className="bi bi-plus me-1"></i>
                    Nouvelle Déclaration
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="bi bi-house me-1"></i>
                    Retour à l'accueil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Nouvelle Déclaration
              </h2>
              <p className="text-muted mb-0">
                Signaler une situation ou demander de l'aide
              </p>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-info">
                <i className="bi bi-question-circle me-1"></i>
                Aide
              </button>
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-telephone me-1"></i>
                Contact d'urgence
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="bi bi-form me-2"></i>
                      Informations de la déclaration
                    </h5>
                  </div>
                  <div className="card-body">
                    {/* Declaration Type */}
                    <div className="mb-4">
                      <fieldset>
                        <legend className="form-label">
                          Type de déclaration *
                        </legend>
                        <div className="row g-2">
                          {declarationTypes.map((type) => (
                            <div key={type.value} className="col-md-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  id={type.value}
                                  value={type.value}
                                  checked={formData.type === type.value}
                                  onChange={handleInputChange}
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor={type.value}
                                >
                                  <div className="card border h-100">
                                    <div className="card-body text-center p-3">
                                      <i
                                        className={`bi ${type.icon} display-6 text-primary mb-2`}
                                      ></i>
                                      <div className="small fw-bold">
                                        {type.label}
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* Basic Information */}
                    <div className="row g-3 mb-4">
                      <div className="col-md-8">
                        <label htmlFor="title" className="form-label">
                          Titre de la déclaration *
                        </label>
                        <input
                          type="text"
                          id="title"
                          className={`form-control ${errors.title ? "is-invalid" : ""}`}
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Résumé bref de votre déclaration"
                          maxLength={100}
                        />
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                        <small className="form-text text-muted">
                          {formData.title.length}/100 caractères
                        </small>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="urgency" className="form-label">
                          Urgence
                        </label>
                        <select
                          id="urgency"
                          className="form-select"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                        >
                          {urgencyLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label htmlFor="category" className="form-label">
                          Catégorie
                        </label>
                        <select
                          id="category"
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">
                        Description détaillée *
                      </label>
                      <textarea
                        id="description"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder="Décrivez la situation de manière détaillée..."
                        maxLength={1000}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}
                      <small className="form-text text-muted">
                        {formData.description.length}/1000 caractères
                      </small>
                    </div>

                    {/* Specific fields for missing person */}
                    {formData.type === "missing_person" && (
                      <div className="border rounded p-3 mb-4 bg-light">
                        <h6 className="mb-3">
                          <i className="bi bi-person me-2"></i>
                          Informations sur la personne disparue
                        </h6>
                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="personName" className="form-label">
                              Nom complet *
                            </label>
                            <input
                              type="text"
                              id="personName"
                              className={`form-control ${errors.personName ? "is-invalid" : ""}`}
                              name="personName"
                              value={formData.personName}
                              onChange={handleInputChange}
                              placeholder="Nom et prénom"
                            />
                            {errors.personName && (
                              <div className="invalid-feedback">
                                {errors.personName}
                              </div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="personAge" className="form-label">
                              Âge approximatif
                            </label>
                            <input
                              type="number"
                              id="personAge"
                              className="form-control"
                              name="personAge"
                              value={formData.personAge}
                              onChange={handleInputChange}
                              placeholder="Âge"
                              min="0"
                              max="120"
                            />
                          </div>
                          <div className="col-md-3">
                            <label
                              htmlFor="personGender"
                              className="form-label"
                            >
                              Genre
                            </label>
                            <select
                              id="personGender"
                              className="form-select"
                              name="personGender"
                              value={formData.personGender}
                              onChange={handleInputChange}
                            >
                              <option value="">Sélectionner</option>
                              <option value="male">Masculin</option>
                              <option value="female">Féminin</option>
                              <option value="other">Autre</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="lastSeenDate"
                              className="form-label"
                            >
                              Date de dernière observation *
                            </label>
                            <input
                              type="date"
                              id="lastSeenDate"
                              className={`form-control ${errors.lastSeenDate ? "is-invalid" : ""}`}
                              name="lastSeenDate"
                              value={formData.lastSeenDate}
                              onChange={handleInputChange}
                              max={new Date().toISOString().split("T")[0]}
                            />
                            {errors.lastSeenDate && (
                              <div className="invalid-feedback">
                                {errors.lastSeenDate}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="lastSeenLocation"
                              className="form-label"
                            >
                              Lieu de dernière observation *
                            </label>
                            <input
                              type="text"
                              id="lastSeenLocation"
                              className={`form-control ${errors.lastSeenLocation ? "is-invalid" : ""}`}
                              name="lastSeenLocation"
                              value={formData.lastSeenLocation}
                              onChange={handleInputChange}
                              placeholder="Adresse ou lieu précis"
                            />
                            {errors.lastSeenLocation && (
                              <div className="invalid-feedback">
                                {errors.lastSeenLocation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className="border rounded p-3 mb-4">
                      <h6 className="mb-3">
                        <i className="bi bi-person-circle me-2"></i>
                        Vos informations de contact
                      </h6>
                      {errors.contact && (
                        <div className="alert alert-danger">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {errors.contact}
                        </div>
                      )}
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="contactPhone" className="form-label">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="contactPhone"
                            className="form-control"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="contactEmail" className="form-label">
                            Email de contact
                          </label>
                          <input
                            type="email"
                            id="contactEmail"
                            className="form-control"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      <small className="form-text text-muted">
                        Au moins un moyen de contact est requis pour pouvoir
                        vous recontacter.
                      </small>
                    </div>

                    {/* File Attachments */}
                    <div className="mb-4">
                      <label htmlFor="attachments" className="form-label">
                        Pièces jointes (optionnel)
                      </label>
                      <input
                        type="file"
                        id="attachments"
                        className="form-control"
                        multiple
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <small className="form-text text-muted">
                        Formats acceptés: Images (JPG, PNG), Documents (PDF,
                        DOC). Taille max: 10MB par fichier.
                      </small>
                      {formData.attachments.length > 0 && (
                        <div className="mt-2">
                          <strong>Fichiers sélectionnés:</strong>
                          <ul className="list-unstyled mt-1">
                            {formData.attachments.map((file, index) => (
                              <li
                                key={`attachment-${file.name}-${index}`}
                                className="small"
                              >
                                <i className="bi bi-file-earmark me-1"></i>
                                {file.name} (
                                {(file.size / 1024 / 1024).toFixed(2)} MB)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Vos informations sont protégées et confidentielles
                      </small>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Voulez-vous vraiment annuler? Toutes les données saisies seront perdues.",
                              )
                            ) {
                              setFormData({
                                type: "missing_person",
                                title: "",
                                description: "",
                                personName: "",
                                personAge: "",
                                personGender: "",
                                lastSeenDate: "",
                                lastSeenLocation: "",
                                contactPhone: "",
                                contactEmail: "",
                                urgency: "medium",
                                category: "general",
                                attachments: [],
                              });
                              setErrors({});
                            }
                          }}
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-label="Envoi en cours"
                              >
                                <span className="visually-hidden">
                                  Envoi...
                                </span>
                              </div>
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-1"></i>
                              Envoyer la déclaration
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar with help and info */}
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Comment ça marche?
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <small>1</small>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Remplissez le formulaire</h6>
                      <small className="text-muted">
                        Fournissez toutes les informations disponibles
                      </small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="flex-shrink-0">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <small>2</small>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Validation et traitement</h6>
                      <small className="text-muted">
                        Votre déclaration est vérifiée et assignée
                      </small>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <div
                        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <small>3</small>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Suivi et réponse</h6>
                      <small className="text-muted">
                        Vous recevez des mises à jour par email
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-telephone me-2"></i>
                    Contacts d'urgence
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong>Police d'urgence:</strong>
                    <br />
                    <a href="tel:19" className="text-decoration-none">
                      19
                    </a>
                  </div>
                  <div className="mb-2">
                    <strong>Gendarmerie:</strong>
                    <br />
                    <a href="tel:177" className="text-decoration-none">
                      177
                    </a>
                  </div>
                  <div className="mb-2">
                    <strong>SAMU:</strong>
                    <br />
                    <a href="tel:141" className="text-decoration-none">
                      141
                    </a>
                  </div>
                  <div>
                    <strong>Ligne d'écoute:</strong>
                    <br />
                    <a href="tel:0800000000" className="text-decoration-none">
                      0800 000 000
                    </a>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-shield-check me-2"></i>
                    Confidentialité
                  </h6>
                </div>
                <div className="card-body">
                  <small className="text-muted">
                    Toutes les informations que vous fournissez sont traitées de
                    manière confidentielle et ne sont utilisées que dans le
                    cadre du traitement de votre déclaration. Vos données
                    personnelles sont protégées selon la législation en vigueur.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeclaration;
