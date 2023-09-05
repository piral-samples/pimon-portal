import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { RolesSelect } from './RolesSelect';
import { User, UserCreate } from './types';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { knownRoles } from './roles';

export interface CreateUserFormProps {
  onSuccess(user: User): void;
  onError(user: UserCreate, error: unknown): void;
}

export function CreateUserForm({ onSuccess, onError }: CreateUserFormProps) {
  const { fetch } = usePiletApi();
  const { mutate } = useSWRConfig();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      roles: [],
    },
    validate: {
      username: isNotEmpty('This field is required.'),
      password: matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'The password must contain uppercase and lowercase letters and numbers.',
      ),
    },
  });

  const submitMutation = useSWRMutation('/gw/portal/api/v1/users', async (_, { arg }: { arg: UserCreate }) => {
    try {
      const response = await fetch<User>(`/gw/portal/api/v1/users`, { body: arg, method: 'post' });
      const user = response.body;

      if (response.code >= 400) {
        throw new Error(`Creating the user failed with status code ${response.code}.`);
      }

      onSuccess(user);
      mutate(`gw/portal/api/v1/users/${user.id}`, user, { revalidate: false });
      form.reset();
    } catch (e) {
      onError(arg, e);
    }
  });

  return (
    <form onSubmit={form.onSubmit((user) => submitMutation.trigger(user))}>
      <Stack>
        <TextInput
          label="Username"
          description="The unique name of the account."
          required
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Password"
          description="The initial password of the user. Must contain at least one upper-case letter, one lower-case letter and one digit."
          required
          {...form.getInputProps('password')}
        />

        <RolesSelect
          description="All roles to be assigned to this user."
          roles={knownRoles}
          {...form.getInputProps('roles')}
        />

        <Group>
          <Button type="submit" disabled={submitMutation.isMutating} loading={submitMutation.isMutating}>
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
