import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createProject as supabaseCreateProject, getProjects as supabaseGetProjects, getProject as supabaseGetProject } from '../lib/supabase';
import { useAuth } from './AuthContext';

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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load projects when authenticated
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const setCurrentProject = async (projectData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const project = await supabaseCreateProject(projectData);
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
      return project;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateProject = async (projectData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // TODO: Add update project API call
      dispatch({ type: 'UPDATE_PROJECT', payload: projectData });
      return projectData;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const loadProjects = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const projects = await supabaseGetProjects();
      dispatch({ type: 'SET_PROJECTS', payload: projects });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const getProject = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const project = await supabaseGetProject(id);
      if (project) {
        dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
      }
      return project;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  return (
    <ProjectContext.Provider value={{ 
      state, 
      setCurrentProject, 
      updateProject, 
      loadProjects,
      getProject,
      currentProject: state.currentProject,
      projects: state.projects,
      loading: state.loading,
      error: state.error
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