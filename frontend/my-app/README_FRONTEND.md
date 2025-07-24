# Ewae Frontend - Plateforme de Gestion Pénitentiaire et Associative

## 📋 Description

Ewae est une plateforme web moderne de gestion pénitentiaire et associative développée avec React. Elle offre des interfaces spécialisées pour différents types d'utilisateurs selon leurs rôles et responsabilités dans le système pénitentiaire marocain.

## 🎯 Fonctionnalités Principales

### 🔐 Authentification Multi-Rôles
- **Agent de Sécurité National**: Supervision des associations et pensionnaires
- **Groupe Associatif**: Gestion des comptes et financements
- **Public**: Déclarations et donations
- **Gestión Persona**: Gestion des pensionnaires
- **Twaa**: Administration générale et coordination

### 📊 Tableaux de Bord Personnalisés
- Statistiques temps réel par rôle
- Alertes et notifications contextuelles
- Actions rapides personnalisées
- État du système en temps réel

### 🛠️ Modules Fonctionnels

#### Agent de Sécurité National
- 🏢 Gestion des associations (liste, filtrage, inspection)
- 👥 Supervision des pensionnaires
- 📞 Contact avec les associations
- 📊 Génération de rapports
- ⚠️ Gestion des alertes de correspondance

#### Groupe Associatif
- 👤 Gestion des comptes d'association
- 💰 Validation des demandes de financement
- 📝 Gestion des plaintes et signalements
- 📈 Génération de rapports d'activité

#### Public
- 📄 Soumission de déclarations
- 🤝 Consultation des partenaires
- 💝 Système de donations

#### Gestión Persona
- 🔍 Consultation des personnes
- 👥 Gestion des pensionnaires
- 🔎 Recherche avancée de pensionnaires

#### Twaa (Administration)
- 💰 Gestion globale des donations
- 📊 Visualisation des statistiques
- 📁 Gestion documentaire
- 👮 Coordination avec la police
- 🔔 Centre de notifications
- 🏛️ Contact avec les provinces
- 👨‍💼 Consultation des agents
- 🔒 Gestion des détenus

## 🛠️ Technologies Utilisées

### Frontend Core
- **React 18.3.1** - Bibliothèque UI
- **React Router DOM 6.30.0** - Routage côté client
- **JavaScript ES6+** - Langage principal

### UI/UX
- **Bootstrap 5.3.2** - Framework CSS
- **Bootstrap Icons 1.11.1** - Iconographie
- **CSS3** - Styles personnalisés avec animations

### Outils de Développement
- **Create React App** - Configuration et build
- **React Testing Library** - Tests unitaires
- **Web Vitals** - Métriques de performance

## 🚀 Installation et Configuration

### Prérequis
```bash
Node.js >= 16.0.0
npm >= 8.0.0 ou yarn >= 1.22.0
```

### Installation
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd Ewae/frontend/my-app

# Installer les dépendances
npm install
# ou
yarn install
```

### Démarrage en Développement
```bash
npm start
# ou
yarn start
```

L'application sera accessible sur `http://localhost:3000`

### Build pour Production
```bash
npm run build
# ou
yarn build
```

## 🏗️ Architecture du Projet

```
src/
├── components/          # Composants réutilisables
├── contexts/           # Contextes React (Auth, etc.)
├── layouts/            # Layouts principaux (Dashboard)
├── pages/              # Pages par rôle utilisateur
│   ├── agent/         # Pages Agent de Sécurité
│   ├── associative/   # Pages Groupe Associatif  
│   ├── public/        # Pages Public
│   ├── persona/       # Pages Gestión Persona
│   ├── twaa/          # Pages Administration Twaa
│   └── dashboard/     # Page d'accueil dashboard
└── App.jsx            # Composant racine avec routage
```

## 🔐 Système d'Authentification

### Comptes de Démonstration
| Rôle | Username | Mot de passe | Fonctionnalités |
|------|----------|--------------|-----------------|
| Agent de Sécurité | `agent` | `password` | Supervision, rapports, alertes |
| Groupe Associatif | `associative` | `password` | Gestion comptes, financements |
| Public | `public` | `password` | Déclarations, donations |
| Gestión Persona | `persona` | `password` | Gestion pensionnaires |
| Twaa | `twaa` | `password` | Administration complète |

### Flux d'Authentification
1. Connexion avec username/password
2. Vérification du rôle utilisateur
3. Redirection vers dashboard personnalisé
4. Navigation basée sur les permissions

## 🎨 Design System

### Palette de Couleurs
- **Primaire**: #3498db (Bleu)
- **Succès**: #2ecc71 (Vert)
- **Danger**: #e74c3c (Rouge)
- **Warning**: #f39c12 (Orange)
- **Info**: #17a2b8 (Cyan)
- **Secondaire**: #6c757d (Gris)

### Composants UI
- **Cards**: Design moderne avec ombres et animations
- **Boutons**: Gradients et effets de survol
- **Formulaires**: Champs stylisés avec validation
- **Tables**: Responsive avec tri et pagination
- **Modals**: Interface claire pour les détails

## 📱 Responsive Design

- **Mobile First**: Optimisé pour les écrans mobiles
- **Breakpoints Bootstrap**: Adaptation automatique
- **Navigation adaptative**: Sidebar collapsible
- **Tables responsives**: Défilement horizontal sur mobile

## 🔧 Configuration Avancée

### Variables d'Environnement
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

### Customisation Bootstrap
Les variables CSS peuvent être modifiées dans `src/index.css`:
```css
:root {
  --bs-primary: #3498db;
  --bs-success: #2ecc71;
  /* ... autres variables */
}
```

## 🧪 Tests

### Exécution des Tests
```bash
npm test
# ou
yarn test
```

### Structure des Tests
- Tests unitaires des composants
- Tests d'intégration des pages
- Tests de navigation et routage

## 📦 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Démarre le serveur de développement |
| `npm test` | Lance les tests en mode watch |
| `npm run build` | Créé le build de production |
| `npm run eject` | Éjecte la configuration CRA |

## 🚀 Déploiement

### Prérequis Production
- Serveur web (Apache, Nginx)
- Node.js pour le build
- HTTPS recommandé

### Build et Déploiement
```bash
# Build de production
npm run build

# Le dossier build/ contient les fichiers statiques
# À déployer sur votre serveur web
```

## 🤝 Contribution

### Standards de Code
- **ESLint**: Configuration React standard
- **Prettier**: Formatage automatique
- **Conventions**: CamelCase pour les composants

### Process de Contribution
1. Fork du projet
2. Création d'une branche feature
3. Développement et tests
4. Pull Request avec description détaillée

## 📄 Structure des Pages

### Pages par Rôle
Chaque rôle dispose de pages spécialisées avec:
- Interface adaptée aux besoins métier
- Données contextuelles
- Actions spécifiques au rôle
- Navigation personnalisée

### Composants Communs
- **Dashboard Layout**: Structure principale
- **Navigation**: Sidebar avec menu adaptatif
- **Modals**: Fenêtres de détail et formulaires
- **Tables**: Listes avec tri, filtres et pagination

## 🔍 Fonctionnalités Avancées

### Recherche et Filtrage
- **Recherche textuelle**: Dans tous les modules
- **Filtres avancés**: Par statut, date, priorité
- **Tri dynamique**: Colonnes cliquables
- **Pagination**: Navigation optimisée

### Notifications
- **Alertes contextuelles**: Selon le rôle
- **Notifications temps réel**: Mises à jour automatiques
- **Centre de notifications**: Historique complet
- **Badges de notification**: Compteurs visuels

### Gestion des États
- **Loading states**: Indicateurs de chargement
- **États d'erreur**: Gestion des erreurs utilisateur
- **États vides**: Messages informatifs
- **Formulaires**: Validation en temps réel

## 🛡️ Sécurité

### Authentification
- **JWT Simulation**: Tokens de session
- **Rôles et Permissions**: Contrôle d'accès
- **Routes Protégées**: Redirection automatique
- **Session Management**: Persistence sécurisée

### Validation
- **Validation côté client**: Contrôles en temps réel
- **Sanitisation**: Nettoyage des données entrantes
- **CSRF Protection**: Protection contre les attaques

## 📊 Performance

### Optimisations
- **Code Splitting**: Chargement à la demande
- **Memoization**: Optimisation React
- **Bundle Analysis**: Analyse de la taille
- **Lazy Loading**: Chargement différé

### Métriques
- **Web Vitals**: Mesure de performance
- **Loading Times**: Optimisation des temps de chargement
- **Bundle Size**: Taille optimisée

## 🐛 Debugging

### Outils de Développement
- **React DevTools**: Inspection des composants
- **Console Logging**: Debug détaillé
- **Network Tab**: Analyse des requêtes
- **Performance Tab**: Profiling

### Messages d'Erreur
- **Error Boundaries**: Gestion centralisée des erreurs
- **User-Friendly Messages**: Messages compréhensibles
- **Logging**: Traçabilité des erreurs

## 📚 Documentation Supplémentaire

### Liens Utiles
- [Documentation React](https://react.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)

### Support
- **Issues GitHub**: Signalement de bugs
- **Discussions**: Questions et améliorations
- **Wiki**: Documentation détaillée

## 📝 Changelog

### Version 1.0.0
- ✅ Système d'authentification multi-rôles
- ✅ Tableaux de bord personnalisés
- ✅ Modules complets pour tous les rôles
- ✅ Interface responsive moderne
- ✅ Gestion avancée des données

## 🎯 Roadmap

### Fonctionnalités Futures
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Notifications push
- [ ] Export PDF/Excel
- [ ] Graphiques avancés
- [ ] Multi-langue
- [ ] API Integration
- [ ] Tests E2E

---

**Développé avec ❤️ pour la modernisation du système pénitentiaire marocain**