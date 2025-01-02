import React from 'react';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="h-10 w-10 text-slate-500" />
            </div>
            <button className="px-4 py-2 text-sm bg-slate-100 rounded-md hover:bg-slate-200">
              Change Avatar
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;