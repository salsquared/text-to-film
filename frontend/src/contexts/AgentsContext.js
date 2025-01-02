import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  agents: [],
  activeAgents: {},
  tasks: [],
  loading: false,
  error: null
};

const agentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AGENTS':
      return {
        ...state,
        agents: action.payload,
        loading: false
      };
    case 'ASSIGN_AGENT':
      return {
        ...state,
        activeAgents: {
          ...state.activeAgents,
          [action.payload.role]: action.payload.agent
        }
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.taskId 
            ? { ...task, status: action.payload.status }
            : task
        )
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
    default:
      return state;
  }
};

const AgentsContext = createContext();

export const AgentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agentsReducer, initialState);

  const assignAgent = (role, agent) => {
    dispatch({ type: 'ASSIGN_AGENT', payload: { role, agent } });
  };

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTaskStatus = (taskId, status) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { taskId, status } });
  };

  const loadAgents = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // TODO: Add actual API call here
      const agents = []; // Temporary mock
      dispatch({ type: 'SET_AGENTS', payload: agents });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <AgentsContext.Provider value={{ 
      state, 
      assignAgent, 
      addTask, 
      updateTaskStatus,
      loadAgents 
    }}>
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentsContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentsProvider');
  }
  return context;
}; 