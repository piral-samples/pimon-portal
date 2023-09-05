import { ReactNode } from 'react';
import { PageHeader } from './PageHeader';
import { Container, Flex } from '@mantine/core';
import React from 'react';

export interface PageProps {
  title?: ReactNode;
  children?: ReactNode;
}

export function Page({ title, children }: PageProps) {
  return (
    <Flex direction="column">
      <PageHeader title={title} />
      <Container sx={{ alignSelf: 'center', width: '100%' }} size="xl" m="md" mt="xl">
        {children}
      </Container>
    </Flex>
  );
}
