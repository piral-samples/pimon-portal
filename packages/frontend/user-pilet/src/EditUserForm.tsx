import { Button, Group, Stack } from '@mantine/core';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { RolesSelect } from './RolesSelect';
import { User, UserUpdate } from './types';
import { useForm } from '@mantine/form';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { knownRoles } from './roles';

export interface EditUserFormProps {
  user: User;
  onSuccess(user: User): void;
  onError(user: User, error: unknown): void;
}

export function EditUserForm({ user, onSuccess, onError }: EditUserFormProps) {
  const { fetch } = usePiletApi();
  const { mutate } = useSWRConfig();
  const form = useForm({
    initialValues: {
      roles: user.roles,
    },
  });

  const submitMutation = useSWRMutation('/gw/portal/api/v1/users', async (_, { arg }: { arg: UserUpdate }) => {
    try {
      const response = await fetch<User>(`/gw/portal/api/v1/users/${user.id}`, { body: arg, method: 'put' });
      const updatedUser = response.body;

      if (response.code >= 400) {
        throw new Error(`Updating the user failed with status code ${response.code}.`);
      }

      onSuccess(updatedUser);
      mutate(`gw/portal/api/v1/users/${user.id}`, updatedUser, { revalidate: false });
      form.reset();
    } catch (e) {
      onError(user, e);
    }
  });

  return (
    <form onSubmit={form.onSubmit((user) => submitMutation.trigger(user))}>
      <Stack>
        <RolesSelect
          description="All roles to be assigned to this user."
          roles={knownRoles}
          {...form.getInputProps('roles')}
        />

        <Group>
          <Button type="submit" disabled={submitMutation.isMutating} loading={submitMutation.isMutating}>
            Update
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
