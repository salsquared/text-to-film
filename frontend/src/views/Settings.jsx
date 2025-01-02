import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Workspace Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="My Workspace"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Project Template
              </label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>Feature Film</option>
                <option>Short Film</option>
                <option>Documentary</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <input type="checkbox" className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Desktop Notifications</span>
              <input type="checkbox" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;