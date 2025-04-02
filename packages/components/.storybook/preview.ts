import type { Preview } from '@storybook/react';
import * as Components from '../src';
import { generateAutocompletion } from 'storybook-addon-playground';
import reactDocgenOutput from '.././.storybook/react-docgen-output.json';

const preview: Preview = {
  parameters: {
    playground: {
      storyId: 'playground',
      components: { ...Components },
      autocompletions: generateAutocompletion(reactDocgenOutput),
      introCode: {
        jsx: `<VibeNext.Heading>Welcome to my Playground!</VibeNext.Heading>`,
        css: '',
      },
      share: true,
    },
  },
};

export default preview;
