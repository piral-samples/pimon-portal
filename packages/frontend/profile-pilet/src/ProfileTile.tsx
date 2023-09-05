import { Text, Image, Skeleton, Group, Title } from '@mantine/core';
import { ErrorState, StandardCardContent, usePiletApi } from '@smapiot/pimon-portal-lib';
import React from 'react';
import useSWR from 'swr/immutable';
import { Link } from 'react-router-dom';
import { Profile } from './types';
import { IconIdBadge2 } from '@tabler/icons-react';

export function ProfileTile() {
  const user = usePiletApi().getUser();
  const { isLoading, data, error } = useSWR<Profile>(`/gw/portal/api/v1/users/${user?.id}/profile`);

  return (
    <StandardCardContent icon={<IconIdBadge2 />} header={data?.displayName ?? '--'}>
      {!data && error && <ErrorState content="Failed to load profile." />}
      {data && !error && (
        <Link to={`/profiles/${user?.id}`} style={{ textDecoration: 'none', color: '#000000' }}>
          <Skeleton visible={isLoading} width="initial">
            <Image src={data?.imageBase64Url} radius="lg" width={100} height={100} fit="contain" withPlaceholder />
          </Skeleton>

          <Title order={4} size="h6" mt="xl" mb="sm">
            Your Badges
          </Title>
          <Skeleton visible={isLoading} width="initial">
            <Group spacing="xs">
              {data?.badges.length !== 0 ? (
                data?.badges.map((badge) => (
                  <Image src={`/gw/assets/sprites/badges/${badge}.png`} height={30} width={30} fit="fill" />
                ))
              ) : (
                <Text c="dimmed">You haven't earned any badges yet...</Text>
              )}
            </Group>
          </Skeleton>
        </Link>
      )}
    </StandardCardContent>
  );
}

export default ProfileTile;
