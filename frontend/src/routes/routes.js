import { createRootRoute, createRoute, redirect, Outlet } from '@tanstack/react-router'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
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
  component: ({ Component, Outlet }) => {
    return <Component><Outlet /></Component>;
  },
})

// Create auth parent route
export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
  beforeLoad: async ({ location }) => {
    const isAuthenticated = localStorage.getItem('sb-auth-token') !== null;
    if (isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
})

// Auth routes
export const signInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signin',
  component: SignIn,
})

export const signUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signup',
  component: SignUp,
})

// Create main parent route
export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  component: MainLayout,
  beforeLoad: async ({ location }) => {
    const isAuthenticated = localStorage.getItem('sb-auth-token') !== null;
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/signin',
      })
    }
  },
})

// Create the index route
export const indexRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/',
  component: ProjectsList,
})

// Create the projects route
export const projectsRoute = createRoute({
  getParentRoute: () => mainRoute,
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
  getParentRoute: () => mainRoute,
  path: 'settings',
  component: Settings,
});

// Add profile route
const profileRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'profile',
  component: Profile,
});

// Export the route tree with both stage and tool routes
export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    signInRoute,
    signUpRoute,
  ]),
  mainRoute.addChildren([
    indexRoute,
    projectsRoute.addChildren([
      projectRoute.addChildren([...stageRoutes, ...toolRoutes])
    ]),
    profileRoute,
    settingsRoute
  ])
]);