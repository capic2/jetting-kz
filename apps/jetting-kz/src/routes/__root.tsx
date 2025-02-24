import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    pendingComponent: () => <div>loading...</div>,
    component: () => (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    ),
  }
);
