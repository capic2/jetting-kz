import type { Meta, StoryObj } from '@storybook/react';
import { SettingsComponent } from '../routes/settings';

const meta: Meta<typeof SettingsComponent> = {
  title: 'Pages/settings',
  component: SettingsComponent,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof SettingsComponent>;

export const Primary: Story = {};
