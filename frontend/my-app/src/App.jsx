
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./layouts/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Dashboard Overview
import DashboardOverview from "./pages/dashboard/DashboardOverview";

// Dashboard Pages - Agent de Sécurité National
import AssociationsList from "./pages/agent/AssociationsList";
import ResidentsList from "./pages/agent/ResidentsList";
import ContactAssociations from "./pages/agent/ContactAssociations";
import GenerateReports from "./pages/agent/GenerateReports";
import AlertsManagement from "./pages/agent/AlertsManagement";

// Dashboard Pages - Groupe Associatif
import ManageAccounts from "./pages/associative/ManageAccounts";
import FundingRequests from "./pages/associative/FundingRequests";
import ComplaintsManagement from "./pages/associative/ComplaintsManagement";
import ActivityReports from "./pages/associative/ActivityReports";
import ContactAssociation from "./pages/associative/ContactAssociation";

// Dashboard Pages - Public
import AddDeclaration from "./pages/public/AddDeclaration";
import PartnersList from "./pages/public/PartnersList";
import AddDonation from "./pages/public/AddDonation";

// Dashboard Pages - Gestión Persona
import ConsultPerson from "./pages/persona/ConsultPerson";
import ManageResidents from "./pages/persona/ManageResidents";
import SearchResident from "./pages/persona/SearchResident";

// Dashboard Pages - Twaa
import DonationsManagement from "./pages/twaa/DonationsManagement";
import StatisticsView from "./pages/twaa/StatisticsView";
import DocumentsManagement from "./pages/twaa/DocumentsManagement";
import ResourcesConsult from "./pages/twaa/ResourcesConsult";
import AgentsConsult from "./pages/twaa/AgentsConsult";
import DetaineesManagement from "./pages/twaa/DetaineesManagement";
import NotificationsCenter from "./pages/twaa/NotificationsCenter";
import ContactProvince from "./pages/twaa/ContactProvince";
import PoliceModule from "./pages/twaa/PoliceModule";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* Default dashboard route */}
        <Route index element={<Navigate to="overview" replace />} />

        {/* Dashboard Overview */}
        <Route path="overview" element={<DashboardOverview />} />

        {/* Agent de Sécurité National Routes */}
        <Route path="associations" element={<AssociationsList />} />
        <Route path="residents" element={<ResidentsList />} />
        <Route path="contact-associations" element={<ContactAssociations />} />
        <Route path="reports" element={<GenerateReports />} />
        <Route path="alerts" element={<AlertsManagement />} />

        {/* Groupe Associatif Routes */}
        <Route path="manage-accounts" element={<ManageAccounts />} />
        <Route path="funding-requests" element={<FundingRequests />} />
        <Route path="complaints" element={<ComplaintsManagement />} />
        <Route path="activity-reports" element={<ActivityReports />} />
        <Route path="contact-association" element={<ContactAssociation />} />

        {/* Public Routes */}
        <Route path="add-declaration" element={<AddDeclaration />} />
        <Route path="partners" element={<PartnersList />} />
        <Route path="add-donation" element={<AddDonation />} />

        {/* Gestión Persona Routes */}
        <Route path="consult-person" element={<ConsultPerson />} />
        <Route path="manage-residents" element={<ManageResidents />} />
        <Route path="search-resident" element={<SearchResident />} />

        {/* Twaa Routes */}
        <Route path="donations" element={<DonationsManagement />} />
        <Route path="statistics" element={<StatisticsView />} />
        <Route path="documents" element={<DocumentsManagement />} />
        <Route path="resources" element={<ResourcesConsult />} />
        <Route path="agents" element={<AgentsConsult />} />
        <Route path="detainees" element={<DetaineesManagement />} />
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="contact-province" element={<ContactProvince />} />
        <Route path="police" element={<PoliceModule />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
>>>>>>> Stashed changes
  );
}

export default App;
