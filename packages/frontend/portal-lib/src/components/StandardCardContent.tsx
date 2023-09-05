import { Group, Stack, StackProps, Text, ThemeIcon } from '@mantine/core';
import React, { ReactNode } from 'react';

export interface StandardCardContentProps extends Omit<StackProps, 'header'> {
  header?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export function StandardCardContent({ header, icon, children, ...rest }: StandardCardContentProps) {
  return (
    <Stack {...rest}>
      {(header || icon) && (
        <Group>
          {icon && <ThemeIcon variant="light">{icon}</ThemeIcon>}
          {header && <Text weight="bolder">{header}</Text>}
        </Group>
      )}

      {children}
    </Stack>
  );
}
