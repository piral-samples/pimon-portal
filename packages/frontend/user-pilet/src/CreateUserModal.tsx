import { Modal } from '@mantine/core';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { User, UserCreate } from './types';
import { CreateUserForm } from './CreateUserForm';

export interface CreateUserModalProps {
  opened: boolean;
  onClose(): void;
}

export function CreateUserModal({ opened, onClose }: CreateUserModalProps) {
  const { showNotification } = usePiletApi();

  const handleSuccess = (user: User) => {
    onClose();
    showNotification(`Successfully created the user "${user.username}".`, {
      title: 'User Created',
      type: 'success',
      autoClose: 5000,
    });
  };

  const handleError = (user: UserCreate) =>
    showNotification(`Creating the user "${user.username}" failed.`, {
      title: 'Error',
      type: 'error',
    });

  return (
    <Modal title="Create User" opened={opened} onClose={onClose}>
      <Modal.Body>
        <CreateUserForm onSuccess={handleSuccess} onError={handleError} />
      </Modal.Body>
    </Modal>
  );
}
