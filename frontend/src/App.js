import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/router';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { AgentsProvider } from './contexts/AgentsContext';

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <ProjectProvider>
          <AgentsProvider>
            <RouterProvider router={router} />
          </AgentsProvider>
        </ProjectProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
