const fs = require('fs');
const path = require('path');

// Component template
const createComponentTemplate = (componentName, title, icon, description) => `import React from 'react';

const ${componentName} = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">
                <i className="bi bi-${icon} me-2"></i>
                ${title}
              </h2>
              <p className="text-muted mb-0">${description}</p>
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
              <i className="bi bi-${icon} display-1 text-muted mb-3"></i>
              <h4>${title}</h4>
              <p className="text-muted">
                ${description}
              </p>
              <p className="text-muted">
                Cette fonctionnalité sera bientôt disponible avec toutes les options de gestion nécessaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${componentName};
`;

// Components to create
const components = [
  // Associative
  {
    path: 'associative/ContactAssociation.jsx',
    name: 'ContactAssociation',
    title: 'Contacter Association',
    icon: 'telephone',
    description: 'Communication avec les associations partenaires'
  },

  // Public
  {
    path: 'public/PartnersList.jsx',
    name: 'PartnersList',
    title: 'Liste des Partenaires',
    icon: 'handshake',
    description: 'Consulter la liste des partenaires et organisations'
  },
  {
    path: 'public/AddDonation.jsx',
    name: 'AddDonation',
    title: 'Faire un Don',
    icon: 'heart',
    description: 'Effectuer une donation pour soutenir les associations'
  },

  // Persona
  {
    path: 'persona/ConsultPerson.jsx',
    name: 'ConsultPerson',
    title: 'Consulter Personne',
    icon: 'person-check',
    description: 'Consulter les informations d\'une personne'
  },
  {
    path: 'persona/ManageResidents.jsx',
    name: 'ManageResidents',
    title: 'Gérer Pensionnaires',
    icon: 'people-fill',
    description: 'Gestion complète des pensionnaires'
  },
  {
    path: 'persona/SearchResident.jsx',
    name: 'SearchResident',
    title: 'Rechercher Pensionnaire',
    icon: 'search',
    description: 'Recherche avancée de pensionnaires'
  },

  // Twaa
  {
    path: 'twaa/StatisticsView.jsx',
    name: 'StatisticsView',
    title: 'Statistiques',
    icon: 'bar-chart',
    description: 'Tableau de bord et statistiques détaillées'
  },
  {
    path: 'twaa/DocumentsManagement.jsx',
    name: 'DocumentsManagement',
    title: 'Gestion des Documents',
    icon: 'file-earmark',
    description: 'Organisation et gestion des documents administratifs'
  },
  {
    path: 'twaa/ResourcesConsult.jsx',
    name: 'ResourcesConsult',
    title: 'Consulter Ressources',
    icon: 'collection',
    description: 'Consultation des ressources disponibles'
  },
  {
    path: 'twaa/AgentsConsult.jsx',
    name: 'AgentsConsult',
    title: 'Consulter Agents',
    icon: 'shield-check',
    description: 'Gestion et consultation des agents de sécurité'
  },
  {
    path: 'twaa/DetaineesManagement.jsx',
    name: 'DetaineesManagement',
    title: 'Gestion des Détenus',
    icon: 'person-lock',
    description: 'Suivi et gestion des personnes détenues'
  },
  {
    path: 'twaa/NotificationsCenter.jsx',
    name: 'NotificationsCenter',
    title: 'Centre de Notifications',
    icon: 'bell',
    description: 'Gestion centralisée des notifications système'
  },
  {
    path: 'twaa/ContactProvince.jsx',
    name: 'ContactProvince',
    title: 'Contacter Province',
    icon: 'geo',
    description: 'Communication avec les autorités provinciales'
  },
  {
    path: 'twaa/PoliceModule.jsx',
    name: 'PoliceModule',
    title: 'Module Police',
    icon: 'shield-exclamation',
    description: 'Interface de coordination avec les forces de police'
  }
];

// Create components
components.forEach(component => {
  const filePath = path.join(__dirname, 'src', 'pages', component.path);
  const dirPath = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create component file
  const content = createComponentTemplate(component.name, component.title, component.icon, component.description);
  fs.writeFileSync(filePath, content);

  console.log(`Created: ${component.path}`);
});

console.log('All placeholder components created successfully!');
