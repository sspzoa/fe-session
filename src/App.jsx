import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, createRoute, createRouter, Navigate, Outlet, RouterProvider } from '@tanstack/react-router'
import PostsPage from './feature/post/pages/PostsPage.jsx'
import PostDetailPage from './feature/post/pages/PostDetailPage.jsx'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
const rootRoute = createRootRoute({ component: () => <Outlet /> })
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: () => <Navigate to="/posts" replace /> }),
  createRoute({ getParentRoute: () => rootRoute, path: '/posts', component: PostsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/posts/$postId', component: PostDetailPage }),
])
const router = createRouter({ routeTree })

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
