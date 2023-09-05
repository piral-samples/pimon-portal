import React, { CSSProperties } from 'react';
import { Skeleton, Stack, StackProps, SystemProp } from '@mantine/core';

export interface SkeletonTextProps extends StackProps {
  lines?: number;
  lineHeight?: SystemProp<CSSProperties['height']>;
}

export function SkeletonText({ lines = 4, lineHeight = 'sm', spacing = 'sm', ...rest }: SkeletonTextProps) {
  return (
    <Stack spacing={spacing} {...rest}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} h={lineHeight ?? 'sm'} w={i + 1 === lines ? '75%' : '100%'} />
      ))}
    </Stack>
  );
}
