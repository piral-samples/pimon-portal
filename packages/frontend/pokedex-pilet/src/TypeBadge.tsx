import { Badge } from '@mantine/core';
import React from 'react';
import { typeToColor } from './constants';

export interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const color = typeToColor[type] ?? 'gray';
  return (
    <Badge variant="gradient" gradient={{ from: color, to: color }}>
      {type}
    </Badge>
  );
}
