import { createRouter, Outlet } from '@tanstack/react-router'
import { RootRoute, Route } from '@tanstack/react-router'
import { lazy } from 'react'
import MainLayout from '../layouts/MainLayout'

// Create the root route
const rootRoute = new RootRoute({
  component: MainLayout,
})

// Create the index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Select a project</div>,
})

// Create the projects route
const projectsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'projects',
  component: () => <Outlet />,
})

const projectRoute = new Route({
  getParentRoute: () => projectsRoute,
  path: '$projectId',
  component: () => <Outlet />,
})

// Stage routes
const stageRoutes = ['development', 'pre-production', 'production', 'post-production'].map(
  stage => new Route({
    getParentRoute: () => projectRoute,
    path: stage,
    component: () => <div>{stage} stage</div>,
  })
)

// Tool routes
const toolRoutes = ['assets', 'team', 'schedule', 'messages'].map(
  tool => new Route({
    getParentRoute: () => projectRoute,
    path: tool,
    component: () => <div>{tool} tool</div>,
  })
)

// Create and export the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute.addChildren([
    projectRoute.addChildren([...stageRoutes, ...toolRoutes])
  ])
])

const router = createRouter({ routeTree })

export default router