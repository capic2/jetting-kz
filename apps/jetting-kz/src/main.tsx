import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { IntlProvider } from 'react-intl';
import frMessages from '../i18n/fr-FR.json';
import OpenAI from 'openai';
import { AppContextProvider } from './context/AppContext';

const queryClient = new QueryClient();
/*
const openAI = new OpenAI({
  apiKey:
    '',  dangerouslyAllowBrowser: true,
});
*/

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <IntlProvider
        locale="fr"
        messages={frMessages}
      >
        {/*<AppContextProvider openAI={openAI}>*/}
        <RouterProvider router={router} />
        {/*</AppContextProvider>*/}
      </IntlProvider>
    </QueryClientProvider>
  </StrictMode>
);
