import { Profile, ProfileUpdate } from './types';
import { Center, Skeleton, Switch, Tooltip } from '@mantine/core';
import React from 'react';
import { ExtensionComponentProps } from '@smapiot/pimon-portal-shell';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { usePiletApi } from '@smapiot/pimon-portal-lib';

export function BadgeManagementButton({ params }: ExtensionComponentProps<{ badgeId: any; profile?: any }>) {
  const { mutate } = useSWRConfig();
  const { fetch } = usePiletApi();

  const hasBadge = params.profile?.badges.includes(params.badgeId) ?? false;

  const updateMutation = useSWRMutation('/gw/portal/api/v1/profiles', async (_, { arg }: { arg: ProfileUpdate }) => {
    const response = await fetch<Profile>(`/gw/portal/api/v1/users/${params.profile.userId}/profile`, {
      body: arg,
      method: 'put',
    });
    const updatedProfile = response.body;

    if (response.code >= 400) {
      throw new Error(`Updating the badge failed with status code ${response.code}.`);
    }

    mutate(`/gw/portal/api/v1/users/${params.profile.userId}/profile`, updatedProfile, { revalidate: false });
  });

  const handleClick = () => {
    const newBadges = hasBadge
      ? params.profile.badges.filter((badge) => badge !== params.badgeId)
      : [...params.profile.badges, params.badgeId];

    updateMutation.trigger({ ...params.profile, badges: newBadges });
  };

  return (
    <Skeleton visible={!params.profile} width="initial">
      <Center>
        <Tooltip label="Add Favorite" withArrow>
          <Switch checked={hasBadge} onChange={() => handleClick()} disabled={updateMutation.isMutating} />
        </Tooltip>
      </Center>
    </Skeleton>
  );
}

export default BadgeManagementButton;
