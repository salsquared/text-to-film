import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { 
  Bell, 
  LayoutDashboard, 
  User,
  Settings,
  FileText,
  Clapperboard,
  Video,
  Scissors,
  FolderOpen,
  Users,
  Calendar,
  MessageSquare,
  Home
} from 'lucide-react';
import { useRouter, useNavigate } from '@tanstack/react-router';

const viewConfig = {
  '/': { title: 'Dashboard', icon: LayoutDashboard },
  '/profile': { title: 'Profile', icon: User },
  '/settings': { title: 'Workspace Settings', icon: Settings },
  '/projects/default/development': { title: 'Development', icon: FileText },
  '/projects/default/pre-production': { title: 'Pre-Production', icon: Clapperboard },
  '/projects/default/production': { title: 'Production', icon: Video },
  '/projects/default/post-production': { title: 'Post-Production', icon: Scissors },
  '/projects/default/assets': { title: 'Asset Library', icon: FolderOpen },
  '/projects/default/team': { title: 'Team', icon: Users },
  '/projects/default/schedule': { title: 'Schedule', icon: Calendar },
  '/projects/default/messages': { title: 'Messages', icon: MessageSquare }
};

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentRoute = useRouter().state.location.pathname;
  const navigate = useNavigate();
  const currentView = viewConfig[currentRoute] || { title: 'Dashboard', icon: LayoutDashboard };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate({ to: '/profile' });
    handleClose();
  };

  const Icon = currentView.icon;

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-slate-500" />
        <h1 className="font-semibold text-xl">{currentView.title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <Bell className="h-5 w-5 text-slate-500" />
        </Button>
        <Button 
          onClick={handleClick}
          className="p-0 min-w-0 rounded-full"
        >
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-5 w-5 text-slate-500" />
          </div>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default TopBar;
