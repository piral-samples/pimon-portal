import { Group, Stack, Title, Text } from '@mantine/core';
import React from 'react';
import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <Group position="apart" my="xl" align="flex-start" noWrap>
      <Stack spacing="0">
        <Title order={3} size="h3">
          {title}
        </Title>
        <Text c="dimmed" fz="sm">
          {subtitle}
        </Text>
      </Stack>

      <Group>{actions}</Group>
    </Group>
  );
}
