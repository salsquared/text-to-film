import React from 'react';
import { Button } from '@mui/material';
import {
  Home,
  FileText,
  Users,
  Calendar,
  Settings,
  FolderOpen,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Video,
  Scissors,
  AlertCircle
} from 'lucide-react';

import { router } from '../../routes/router';

const Sidebar = ({ isExpanded, setIsExpanded, activeStage, setActiveStage }) => {
  const handleNavigation = (path, type = 'stage') => {
    setActiveStage(path);
    router.navigate({
      to: `/projects/default/${path}`
    });
  };

  const productionStages = [
    { id: 'development', label: 'Development', icon: FileText, status: 'active' },
    { id: 'pre-production', label: 'Pre-Production', icon: Clapperboard, status: 'upcoming' },
    { id: 'production', label: 'Production', icon: Video, status: 'locked' },
    { id: 'post-production', label: 'Post-Production', icon: Scissors, status: 'locked' }
  ];

  const commonTools = [
    { id: 'assets', label: 'Asset Library', icon: FolderOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  return (
    <div className={`bg-slate-900 text-white flex flex-col ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
      {/* Top Section - Logo & Toggle */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isExpanded && <span className="font-bold text-lg">text-to-film</span>}
        <Button 
          variant="text" 
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              color: 'common.white'
            }
          }}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Project Overview */}
      <div className="p-4 border-b border-slate-700">
        {isExpanded ? (
          <div className="space-y-2">
            <h2 className="font-semibold">Current Project</h2>
            <p className="text-sm text-slate-400">Project Name</p>
          </div>
        ) : (
          <Home className="h-5 w-5 text-slate-400" />
        )}
      </div>

      {/* Production Stages */}
      <div className="p-4 border-b border-slate-700">
        {isExpanded && <h3 className="text-sm font-semibold mb-4 text-slate-400">PRODUCTION STAGES</h3>}
        <nav className="space-y-2">
          {productionStages.map((stage) => (
            <Button
              key={stage.id}
              variant="ghost"
              className={`w-full justify-start ${
                activeStage === stage.id ? 'bg-slate-800' : ''
              } ${stage.status === 'locked' ? 'opacity-50' : ''}`}
              onClick={() => handleNavigation(stage.id)}
            >
              <stage.icon className="h-5 w-5 mr-2" />
              {isExpanded && (
                <span className="flex-grow text-left">{stage.label}</span>
              )}
              {isExpanded && stage.status === 'locked' && (
                <AlertCircle className="h-4 w-4 text-slate-500" />
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Common Tools */}
      <div className="p-4 border-b border-slate-700">
        {isExpanded && <h3 className="text-sm font-semibold mb-4 text-slate-400">TOOLS</h3>}
        <nav className="space-y-2">
          {commonTools.map((tool) => (
            <Button
              key={tool.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(tool.id, 'tool')}
            >
              <tool.icon className="h-5 w-5 mr-2" />
              {isExpanded && tool.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-t border-slate-700">
        <nav className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => router.navigate({ to: '/settings' })}
          >
            <Settings className="h-5 w-5 mr-2" />
            {isExpanded && 'Settings'}
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
