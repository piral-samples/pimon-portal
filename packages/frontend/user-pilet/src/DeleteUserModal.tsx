import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import useSWRMutation from 'swr/mutation';
import { User } from './types';

export interface DeleteUserModalProps {
  /**
   * The user to be deleted.
   */
  user: User;
  /**
   * Whether the modal is currently opened.
   */
  opened: boolean;
  /**
   * A callback invoked when the modal should be closed.
   * This is called both when the modal is confirmed and canceled.
   */
  onClose(): void;
  /**
   * A callback invoked when the user has been deleted.
   */
  onDeleted?(): void;
}

/**
 * The confirmation modal which is shown prior to deleting a user.
 * This component takes care of the deletion API calls if the user confirms.
 */
export function DeleteUserModal({ user, opened, onClose, onDeleted }: DeleteUserModalProps) {
  const { fetch, showNotification } = usePiletApi();
  const { isMutating, trigger } = useSWRMutation('/gw/portal/api/v1/users', async () => {
    const { code } = await fetch(`/gw/portal/api/v1/users/${user.id}`, { method: 'delete' });

    if (code <= 299) {
      showNotification(`Successfully deleted the user "${user.username}".`, {
        title: 'User Deleted',
        type: 'success',
        autoClose: 5000,
      });

      onDeleted?.();
      onClose();
    } else {
      showNotification(`An error occured while deleting the user "${user.username}".`, {
        title: 'Error',
        type: 'error',
      });
    }
  });

  return (
    <Modal title="Delete User" opened={opened} onClose={onClose}>
      <Modal.Body>
        <Stack>
          <Text style={{ whiteSpace: 'pre-line' }}>
            Are you sure that you want to permanently delete the user {user.username}?
          </Text>
          <Group>
            <Button disabled={isMutating} loading={isMutating} onClick={() => trigger()}>
              Yes, delete the user
            </Button>
            <Button color="gray" variant="light" onClick={onClose}>
              No, cancel
            </Button>
          </Group>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
