import { createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import MainLayout from '../layouts/MainLayout'
import ProjectsList from '../views/ProjectsList'

// Import stage components
import Development from '../views/stages/Development'
import PreProduction from '../views/stages/PreProduction'
import Production from '../views/stages/Production'
import PostProduction from '../views/stages/PostProduction'

// Import tool components
import Assets from '../views/tools/Assets'
import Team from '../views/tools/Team'
import Schedule from '../views/tools/Schedule'
import Messages from '../views/tools/Messages'

// User routes
import Settings from '../views/Settings'
import Profile from '../views/Profile'

// Auth routes
import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/SignUp'

// Create the root route
export const rootRoute = createRootRoute({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context?.auth?.isAuthenticated;
    const isAuthRoute = ['/signin', '/signup'].includes(window.location.pathname);
    
    if (!isAuthenticated && !isAuthRoute) {
      throw redirect({
        to: '/signin',
      })
    }
    
    if (isAuthenticated && isAuthRoute) {
      throw redirect({
        to: '/',
      })
    }
  },
})

// Auth routes
export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signin',
  component: SignIn,
})

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: SignUp,
})

// Create the index route
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProjectsList,
})

// Create the projects route
export const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'projects',
})

export const projectRoute = createRoute({
  getParentRoute: () => projectsRoute,
  path: '$projectId',
})

// Stage routes with actual components
const stageRoutes = [
  {
    path: 'development',
    component: Development
  },
  {
    path: 'pre-production',
    component: PreProduction
  },
  {
    path: 'production',
    component: Production
  },
  {
    path: 'post-production',
    component: PostProduction
  }
].map(stage => createRoute({
  getParentRoute: () => projectRoute,
  path: stage.path,
  component: stage.component
}))

// Tool routes with actual components
const toolRoutes = [
  {
    path: 'assets',
    component: Assets
  },
  {
    path: 'team',
    component: Team
  },
  {
    path: 'schedule',
    component: Schedule
  },
  {
    path: 'messages',
    component: Messages
  }
].map(tool => createRoute({
  getParentRoute: () => projectRoute,
  path: tool.path,
  component: tool.component
}))

// Create the settings route
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'settings',
  component: Settings,
});

// Add profile route
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'profile',
  component: Profile,
});

// Export the route tree with both stage and tool routes
export const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  indexRoute,
  projectsRoute.addChildren([
    projectRoute.addChildren([...stageRoutes, ...toolRoutes])
  ]),
  profileRoute,
  settingsRoute
]);