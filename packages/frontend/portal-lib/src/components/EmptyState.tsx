import React from 'react';
import { Flex, MantineStyleSystemProps, Space } from '@mantine/core';
import { ReactNode } from 'react';
import { Image, Text, Title } from '@mantine/core';
import error from '../assets/error.png';

export interface EmptyStateProps extends MantineStyleSystemProps {
  image?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  details?: ReactNode;
  primaryAction?: ReactNode;
  center?: boolean;
}

export function EmptyState({
  image = error,
  title,
  content,
  details,
  primaryAction,
  center,
  ...rest
}: EmptyStateProps) {
  if (typeof image === 'string') {
    image = <Image src={image} width={150} fit="contain" withPlaceholder mb="md" />;
  }

  if (typeof title === 'string') {
    title = (
      <Title order={3} size="h2" weight="normal">
        {title}
      </Title>
    );
  }

  if (typeof content === 'string') {
    content = (
      <Text component="p" m="0">
        {content}
      </Text>
    );
  }

  if (typeof details === 'string') {
    details = (
      <Text c="gray" size="sm">
        {details}
      </Text>
    );
  }

  return (
    <Flex direction="column" align={center ? 'center' : 'flex-start'} {...rest}>
      {image}
      {image && title && <Space h="sm" />}
      {title}
      {content}
      {details}
      {(content || details) && primaryAction && <Space h="md" />}
      {primaryAction}
    </Flex>
  );
}
