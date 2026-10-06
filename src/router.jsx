import { createRootRoute, createRoute, createRouter, Navigate, Outlet } from '@tanstack/react-router'
import PostsPage from './routes/posts/index.jsx'
import PostDetailPage from './routes/posts/$postId.jsx'

const rootRoute = createRootRoute({ component: Outlet })
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: () => <Navigate to="/posts" replace /> }),
  createRoute({ getParentRoute: () => rootRoute, path: '/posts', component: PostsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/posts/$postId', component: PostDetailPage }),
])

export const router = createRouter({ routeTree })
