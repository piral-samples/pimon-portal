import { Page, SectionHeader, SkeletonText } from '@smapiot/pimon-portal-lib';
import React from 'react';
import useSWR from 'swr';
import { ProfilesTable } from './ProfilesTable';
import { Profile } from './types';

export function ProfilesPage() {
  const { isLoading, data, error } = useSWR<Array<Profile>>('/gw/portal/api/v1/profiles');

  return (
    <Page title="Profiles">
      <SectionHeader title="All User Profiles" subtitle="Explore all publicly available user profiles." />
      {isLoading && !error && <SkeletonText />}
      {data && <ProfilesTable data={data} />}
    </Page>
  );
}

export default ProfilesPage;
