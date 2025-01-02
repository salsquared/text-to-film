import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeStage, setActiveStage] = useState('development');

  return (
    <div className="flex h-screen">
      <Sidebar 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
