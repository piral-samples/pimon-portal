import { Table, MediaQuery, Group, Badge, Tooltip, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { formatDateTime, formatDate, usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { DeleteUserModal } from './DeleteUserModal';
import { getRoleColor } from './roles';
import { User } from './types';
import { EditUserModal } from './EditUserModal';

export interface UsersTableProps {
  /**
   * The users to be rendered in the table.
   */
  data: Array<User>;
}

/**
 * Renders a table of all existing users.
 */
export function UsersTable({ data }: UsersTableProps) {
  const hidden = { display: 'none' };

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Username</th>
          <MediaQuery styles={hidden} smallerThan="xs">
            <th>Roles</th>
          </MediaQuery>
          <MediaQuery styles={hidden} smallerThan="md">
            <th>Created At</th>
          </MediaQuery>
          <MediaQuery styles={hidden} smallerThan="md">
            <th>Updated At</th>
          </MediaQuery>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <RolesColumn user={user} />
            <MediaQuery styles={hidden} smallerThan="md">
              <td header={formatDateTime(user.createdAt)}>{formatDate(user.createdAt)}</td>
            </MediaQuery>
            <MediaQuery styles={hidden} smallerThan="md">
              <td header={formatDateTime(user.updatedAt)}>{formatDate(user.updatedAt)}</td>
            </MediaQuery>
            <MenuColumn user={user} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

interface RolesColumnProps {
  user: User;
}

function RolesColumn({ user }: RolesColumnProps) {
  const maxRolesToDisplay = 2;
  const [rolesToDisplay, missingRoles] = [user.roles.slice(0, maxRolesToDisplay), user.roles.slice(maxRolesToDisplay)];

  return (
    <MediaQuery styles={{ display: 'none' }} smallerThan="xs">
      <td>
        <Group spacing="xs" noWrap>
          {rolesToDisplay.length > 0
            ? rolesToDisplay.map((role) => (
                <Badge key={role} color={getRoleColor(role)} variant="filled">
                  {role}
                </Badge>
              ))
            : '--'}
          {missingRoles.length > 0 && (
            <Tooltip label={missingRoles.join(', ')} withArrow>
              <Badge color="gray" variant="outline">
                +{missingRoles.length}
              </Badge>
            </Tooltip>
          )}
        </Group>
      </td>
    </MediaQuery>
  );
}

interface MenuColumnProps {
  user: User;
}

function MenuColumn({ user }: MenuColumnProps) {
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const { Extension } = usePiletApi();

  return (
    <td>
      <Group>
        <Extension name="user-profile" params={{ user: user }} />
        <Tooltip label="Edit" withArrow>
          <ActionIcon variant="subtle" onClick={openEditModal}>
            <IconEdit size="1.125rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete" withArrow>
          <ActionIcon variant="subtle" onClick={openDeleteModal}>
            <IconTrash size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      </Group>

      <EditUserModal user={user} opened={editModalOpened} onClose={closeEditModal} />
      <DeleteUserModal user={user} opened={deleteModalOpened} onClose={closeDeleteModal} />
    </td>
  );
}
