import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routes';

// Create router without context - we'll handle auth in the routes
export const router = createRouter({ routeTree });
