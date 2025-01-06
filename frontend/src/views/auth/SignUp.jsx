import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { setCurrentProject } = useProject();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  // User details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Project details
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('feature');
  const [projectDescription, setProjectDescription] = useState('');

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ email, password, name });
      setStep(2);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const project = {
        name: projectName,
        type: projectType,
        description: projectDescription,
      };
      await setCurrentProject(project);
      navigate({ to: '/' });
    } catch (err) {
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Create your account' : 'Create your first project'}
          </h2>
          {step === 1 && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate({ to: '/signin' })}
                className="font-medium text-slate-900 hover:text-slate-700"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleUserSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleProjectSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="projectName" className="sr-only">
                  Project Name
                </label>
                <input
                  id="projectName"
                  name="projectName"
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="sr-only">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                >
                  <option value="feature">Feature Film</option>
                  <option value="short">Short Film</option>
                  <option value="documentary">Documentary</option>
                  <option value="series">Series</option>
                </select>
              </div>
              <div>
                <label htmlFor="projectDescription" className="sr-only">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows="4"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Project Description"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="group relative w-full flex justify-center py-2 px-4 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Create Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp; 