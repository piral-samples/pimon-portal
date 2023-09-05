import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Profile } from './types';
import { Group, Text, Skeleton, Image, Flex, Stack, Title } from '@mantine/core';
import { ErrorState, Page, SectionHeader, usePiletApi } from '@smapiot/pimon-portal-lib';
import { range } from 'lodash';

export function ProfileDetailsPage() {
  const { id: profileId } = useParams<{ id: string }>();
  const { Extension } = usePiletApi();
  const { isLoading, data, error } = useSWR<Profile>(`/gw/portal/api/v1/users/${profileId}/profile`);

  return (
    <Page title="User Profile">
      {!data && error && <ErrorState content="Failed to load profile." />}
      {data && !error && (
        <>
          <Group align="flex-end" spacing="xl" noWrap>
            <Skeleton visible={isLoading} width="initial">
              <Image src={data?.imageBase64Url} radius="lg" width={150} height={150} fit="contain" withPlaceholder />
            </Skeleton>

            <Stack>
              <Skeleton visible={isLoading}>
                <Title order={3} size="h1">
                  {data?.displayName}
                </Title>
              </Skeleton>
              <Skeleton visible={isLoading}>
                <Text fz="md" c="dimmed">
                  {data?.motd}
                </Text>
              </Skeleton>
            </Stack>
          </Group>
          <Extension name="profile-details" params={{ profile: data }} />
          <SectionHeader title="Badges" subtitle="All gym badges which have been earned by this user, so far." />
          <Flex justify={'space-between'} wrap="wrap">
            {range(1, 9).map((badgeNum) => (
              <Stack justify="center">
                <Image
                  src={`/gw/assets/sprites/badges/${badgeNum}.png`}
                  height={100}
                  width={100}
                  fit="fill"
                  sx={{ filter: data?.badges.includes(badgeNum) ? undefined : 'grayscale(100%)' }}
                />
                <Extension name="profile-badge-management" params={{ profile: data, badgeId: badgeNum }} />
              </Stack>
            ))}
          </Flex>
        </>
      )}
    </Page>
  );
}

export default ProfileDetailsPage;
