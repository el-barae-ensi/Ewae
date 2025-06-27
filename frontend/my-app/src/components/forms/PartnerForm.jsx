import React, { useState } from 'react';
import '../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const PartnerForm = ({ initialData, onSubmit, formType = "create" }) => {
  const [formData, setFormData] = useState(initialData || {
    nomP: '',
    champActivie: '',
    description: '',
    logo: null
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'logo') {
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
          {formType === "create" ? "Add Partner" : "Edit Partner"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="nomP">Partner Name</label>
            <div className="input-field">
              <i className="bi bi-building input-icon"/>
              <input
                type="text"
                id="nomP"
                value={formData.nomP}
                onChange={handleChange}
                placeholder="Enter partner name"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="champActivie">Field of Activity</label>
            <div className="input-field">
              <i className="bi bi-briefcase input-icon"/>
              <input
                type="text"
                id="champActivie"
                value={formData.champActivie}
                onChange={handleChange}
                placeholder="Enter field of activity"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="description">Description</label>
            <div className="input-field">
              <i className="bi bi-file-text input-icon"/>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={{ width: '100%', border: 'none', outline: 'none' }}
                rows="3"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="logo">Logo</label>
            <div className="input-field">
              <i className="bi bi-image input-icon"/>
              <input
                type="file"
                id="logo"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            {formType === "create" ? "Add Partner" : "Update Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};
