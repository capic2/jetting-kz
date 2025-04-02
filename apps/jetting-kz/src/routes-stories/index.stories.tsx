import type { Meta, StoryObj } from '@storybook/react';
import { http } from 'msw';
import { IndexComponent } from '../routes';
import { weather } from '../../mocks/weather';

const meta: Meta<typeof IndexComponent> = {
  title: 'Pages/index',
  component: IndexComponent,
  parameters: {
    msw: {
      handlers: {
        weatherHandler: http.get(
          'https://api.openweathermap.org/data/2.5/weather',
          () => {
            return new Response(JSON.stringify(weather));
          }
        ),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IndexComponent>;

export const Primary: Story = {};
