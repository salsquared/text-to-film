import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentProject: null,
  projects: [],
  loading: false,
  error: null
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        loading: false
      };
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload 
          : state.currentProject,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    default:
      return state;
  }
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Add project methods
  const setCurrentProject = (project) => {
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
  };

  const updateProject = (projectData) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: projectData });
  };

  const loadProjects = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // TODO: Add actual API call here
      const projects = []; // Temporary mock
      dispatch({ type: 'SET_PROJECTS', payload: projects });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <ProjectContext.Provider value={{ 
      state, 
      setCurrentProject, 
      updateProject, 
      loadProjects 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}; 