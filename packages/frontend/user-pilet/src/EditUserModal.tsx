import { Modal } from '@mantine/core';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { User } from './types';
import { EditUserForm } from './EditUserForm';

export interface EditUserModalProps {
  user: User;
  opened: boolean;
  onClose(): void;
}

export function EditUserModal({ user, opened, onClose }: EditUserModalProps) {
  const { showNotification } = usePiletApi();

  const handleSuccess = (user: User) => {
    onClose();
    showNotification(`Successfully updated the user "${user.username}".`, {
      title: 'User Updated',
      type: 'success',
      autoClose: 5000,
    });
  };

  const handleError = (user: User) =>
    showNotification(`Updating the user "${user.username}" failed.`, {
      title: 'Error',
      type: 'error',
    });

  return (
    <Modal title="Update User" opened={opened} onClose={onClose}>
      <Modal.Body>
        <EditUserForm user={user} onSuccess={handleSuccess} onError={handleError} />
      </Modal.Body>
    </Modal>
  );
}
