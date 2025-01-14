import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useUI } from '../../contexts/UIContext';

const MainLayout = () => {
  const { state, dispatch } = useUI();
  
  return (
    <div className="flex h-screen">
      <Sidebar 
        isExpanded={state.sidebarExpanded}
        setIsExpanded={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        activeStage={state.activeStage}
        setActiveStage={(stage) => dispatch({ type: 'SET_ACTIVE_STAGE', payload: stage })}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
