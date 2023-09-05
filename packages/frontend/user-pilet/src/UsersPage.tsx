import { Button } from '@mantine/core';
import { ErrorState, Page, SectionHeader, SkeletonText } from '@smapiot/pimon-portal-lib';
import React from 'react';
import useSWR from 'swr';
import { IconPlus } from '@tabler/icons-react';
import { UsersTable } from './UsersTable';
import { User } from './types';
import { CreateUserModal } from './CreateUserModal';
import { useDisclosure } from '@mantine/hooks';

/**
 * The page responsible for displaying all existing users.
 */
export function UsersPage() {
  const { isLoading, data, error, mutate } = useSWR<Array<User>>('/gw/portal/api/v1/users');
  const [createModalOpened, createModal] = useDisclosure(false);

  return (
    <Page title="Portal Users">
      <SectionHeader
        title="All Portal Users"
        subtitle="Account information of all users that are registered within the portal."
        actions={
          <Button rightIcon={<IconPlus />} onClick={createModal.open}>
            New
          </Button>
        }
      />

      {isLoading && !error && <SkeletonText />}
      {data && <UsersTable data={data} />}

      {!data && error && (
        <ErrorState
          content="Loading failed"
          details={error?.message ?? error}
          primaryAction={<Button onClick={() => mutate()}>Retry</Button>}
        />
      )}

      <CreateUserModal opened={createModalOpened} onClose={createModal.close} />
    </Page>
  );
}

export default UsersPage;
