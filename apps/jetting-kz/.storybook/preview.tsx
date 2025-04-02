import './tailwind.css';
import '../src/styles.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  ErrorComponent,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import type { Preview, StoryContext } from '@storybook/react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { IntlProvider } from 'react-intl';
import { setConsoleOptions } from '@storybook/addon-console';
import frMessages from '../i18n/fr-FR.json';
import { configureActions } from '@storybook/addon-actions';
import { SettingsComponent } from '../src/routes/settings';

// Initialize MSW
initialize();

interface RouterDecoratorContext extends StoryContext {
  parameters: {
    router?: {
      initialEntries?: string[];
      initialIndex?: number;
      routes?: string[];
    };
  };
}

const queryClient = new QueryClient();

configureActions({
  clearOnStoryChange: true,
});

setConsoleOptions({
  panelInclude: [/\*\* \[intl\] \*\*!/i],
});

const preview: Preview = {
  parameters: {},
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  decorators: [
    (Story, { parameters }: RouterDecoratorContext) => {
      const {
        initialEntries = ['/'],
        initialIndex = 0,
        routes = ['/'],
      } = parameters?.router || {};
      const rootRoute = createRootRoute({
        errorComponent: ErrorComponent,
        component: () => (
          <>
            <Outlet />
            <TanStackRouterDevtools />
          </>
        ),
      });
      rootRoute.addChildren(
        routes.map((path) =>
          createRoute({
            path,
            getParentRoute: () => rootRoute,
            component: Story,
          })
        )
      );

      const router = createRouter({
        history: createMemoryHistory({ initialEntries, initialIndex }),
        routeTree: rootRoute,
        context: {
          queryClient,
        },
      });

      return <RouterProvider router={router} />;
    },
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale="FR"
          messages={frMessages}
          onError={(err) => {
            if (err.code === 'MISSING_TRANSLATION') {
              console.error(
                `** [intl] ** Missing translation: ${err.message.replace(
                  '[@formatjs/intl Error MISSING_TRANSLATION] Missing message: ',
                  ''
                )}`
              );
            }

            console.error(err);
          }}
        >
          <Story />
        </IntlProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
