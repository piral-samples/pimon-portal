import { MantineColor } from '@mantine/core';

/**
 * A list of all known roles.
 */
export const knownRoles = ['admin', 'gym-leader', 'trainer'];

const roleToColorMap: Record<string, MantineColor> = {
  admin: 'red',
  ['gym-leader']: 'violet',
  trainer: 'gray',
};

/**
 * Returns a Mantine color matching the given role.
 * @param role The user role.
 */
export function getRoleColor(role: string): MantineColor {
  return roleToColorMap[role] ?? 'gray';
}
