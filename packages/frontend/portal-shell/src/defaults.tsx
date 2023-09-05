import { InitialMenuItem } from 'piral';
import { LogOutMenuItem } from './components/LogOutMenuItem';

export const defaultMenuItems: Array<InitialMenuItem> = [
  {
    settings: { type: 'user' },
    component: LogOutMenuItem,
  },
];
