import React from 'react';
import type { PiletApi } from '@smapiot/pimon-portal-shell';
import { MenuNavLink, withPiletApi } from '@smapiot/pimon-portal-lib';
import { IconUsers } from '@tabler/icons-react';

const Users = React.lazy(() => import('./UsersPage'));
const UsersTile = React.lazy(() => import('./UsersTile'));

export function setup(app: PiletApi) {
  app.registerPage('/users', withPiletApi(Users));

  app.registerMenu(() => <MenuNavLink to="/users" match="/users" label="Users" icon={IconUsers} />, {
    name: 'users',
  });

  app.registerTile(withPiletApi(UsersTile), { to: '/users' });
}
