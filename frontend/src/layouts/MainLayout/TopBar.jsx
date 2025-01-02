import React from 'react';
import { Button } from '@mui/material';
import { Bell, LayoutDashboard } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <LayoutDashboard className="h-5 w-5 text-slate-500" />
        <h1 className="font-semibold text-xl">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <Bell className="h-5 w-5 text-slate-500" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </header>
  );
};

export default TopBar;
