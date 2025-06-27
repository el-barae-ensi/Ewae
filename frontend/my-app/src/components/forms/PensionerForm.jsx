import React, { useState } from 'react';
import '../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const PensionerForm = ({ initialData, onSubmit, formType = "create" }) => {
  const [formData, setFormData] = useState(initialData || {
    date_naissance: '',
    lieu_naissance: '',
    photos: null,
    empreint: '',
    caracteristiques: '',
    localisation: '',
    date_trouver: ''
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'photos') {
      setFormData(prevData => ({
        ...prevData,
        [id]: files[0]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="authontification">
      <div className="auth-card">
        <h1 className="login-title">
          {formType === "create" ? "Add Pensioner" : "Edit Pensioner"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="date_naissance">Date of Birth</label>
            <div className="input-field">
              <i className="bi bi-calendar input-icon"/>
              <input
                type="date"
                id="date_naissance"
                value={formData.date_naissance}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="lieu_naissance">Place of Birth</label>
            <div className="input-field">
              <i className="bi bi-geo-alt input-icon"/>
              <input
                type="text"
                id="lieu_naissance"
                value={formData.lieu_naissance}
                onChange={handleChange}
                placeholder="Enter place of birth"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="photos">Photos</label>
            <div className="input-field">
              <i className="bi bi-camera input-icon"/>
              <input
                type="file"
                id="photos"
                onChange={handleChange}
                accept="image/*"
                multiple
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="empreint">Fingerprint</label>
            <div className="input-field">
              <i className="bi bi-fingerprint input-icon"/>
              <input
                type="text"
                id="empreint"
                value={formData.empreint}
                onChange={handleChange}
                placeholder="Enter fingerprint identifier"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="caracteristiques">Characteristics</label>
            <div className="input-field">
              <i className="bi bi-list-ul input-icon"/>
              <textarea
                id="caracteristiques"
                value={formData.caracteristiques}
                onChange={handleChange}
                placeholder="Enter characteristics"
                style={{ width: '100%', border: 'none', outline: 'none' }}
                rows="3"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="localisation">Location</label>
            <div className="input-field">
              <i className="bi bi-geo input-icon"/>
              <input
                type="text"
                id="localisation"
                value={formData.localisation}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="date_trouver">Date Found</label>
            <div className="input-field">
              <i className="bi bi-calendar-check input-icon"/>
              <input
                type="date"
                id="date_trouver"
                value={formData.date_trouver}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            {formType === "create" ? "Add Pensioner" : "Update Pensioner"}
          </button>
        </form>
      </div>
    </div>
  );
};
