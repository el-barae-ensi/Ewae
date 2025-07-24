import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // User roles constants
  const USER_ROLES = {
    AGENT_SECURITE: 'agent_securite',
    GROUPE_ASSOCIATIF: 'groupe_associatif',
    PUBLIC: 'public',
    GESTION_PERSONA: 'gestion_persona',
    TWAA: 'twaa'
  };

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('ewae_user');
        const token = localStorage.getItem('ewae_token');

        if (userData && token) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('ewae_user');
        localStorage.removeItem('ewae_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Store user data and token
      localStorage.setItem('ewae_user', JSON.stringify(data.user));
      localStorage.setItem('ewae_token', data.token);

      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);

      // For demo purposes, simulate login with different roles
      const mockUser = getMockUser(credentials.username);
      if (mockUser) {
        localStorage.setItem('ewae_user', JSON.stringify(mockUser));
        localStorage.setItem('ewae_token', 'mock_token_' + Date.now());
        setUser(mockUser);
        return { success: true, user: mockUser };
      }

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ewae_user');
    localStorage.removeItem('ewae_token');
    setUser(null);
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  // Mock user data for demo purposes
  const getMockUser = (username) => {
    const mockUsers = {
      'agent': {
        id: 1,
        username: 'agent',
        name: 'Agent de Sécurité',
        email: 'agent@ewae.ma',
        role: USER_ROLES.AGENT_SECURITE,
        permissions: [
          'view_associations',
          'filter_associations',
          'view_residents',
          'filter_residents',
          'contact_associations',
          'generate_notifications',
          'generate_reports',
          'manage_alerts'
        ]
      },
      'associative': {
        id: 2,
        username: 'associative',
        name: 'Groupe Associatif',
        email: 'groupe@ewae.ma',
        role: USER_ROLES.GROUPE_ASSOCIATIF,
        permissions: [
          'manage_association_accounts',
          'validate_funding_requests',
          'manage_complaints',
          'generate_activity_reports',
          'contact_associations'
        ]
      },
      'public': {
        id: 3,
        username: 'public',
        name: 'Utilisateur Public',
        email: 'public@ewae.ma',
        role: USER_ROLES.PUBLIC,
        permissions: [
          'add_declaration',
          'view_partners',
          'add_donation'
        ]
      },
      'persona': {
        id: 4,
        username: 'persona',
        name: 'Gestión Persona',
        email: 'persona@ewae.ma',
        role: USER_ROLES.GESTION_PERSONA,
        permissions: [
          'consult_person',
          'manage_residents',
          'search_residents',
          'manage_pensionarios'
        ]
      },
      'twaa': {
        id: 5,
        username: 'twaa',
        name: 'Administrateur Twaa',
        email: 'twaa@ewae.ma',
        role: USER_ROLES.TWAA,
        permissions: [
          'manage_donations',
          'view_statistics',
          'manage_documents',
          'consult_resources',
          'consult_agents',
          'manage_detainees',
          'receive_notifications',
          'contact_province',
          'manage_police'
        ]
      }
    };

    return mockUsers[username] || null;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    hasRole,
    hasAnyRole,
    USER_ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
