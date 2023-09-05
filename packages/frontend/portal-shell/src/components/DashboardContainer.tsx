import { Grid } from '@mantine/core';
import { Page, SectionHeader } from '@smapiot/pimon-portal-lib';
import { DashboardContainerProps } from 'piral';
import React from 'react';

export function DashboardContainer({ children }: DashboardContainerProps) {
  return (
    <Page title="Home">
      <SectionHeader title="Hey! 👋🏻" subtitle="Welcome to the Pimon Portal!" />
      <Grid>{children}</Grid>
    </Page>
  );
}
