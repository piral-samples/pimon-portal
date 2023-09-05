import { IconLogout } from '@tabler/icons-react';
import React from 'react';
import { useAuth } from '../auth';
import { MenuNavLink } from '@smapiot/pimon-portal-lib';

export function LogOutMenuItem() {
  const { logout } = useAuth();
  return <MenuNavLink icon={IconLogout} label="Logout" onClick={logout} />;
}
