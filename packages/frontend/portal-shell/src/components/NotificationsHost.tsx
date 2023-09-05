import React from 'react';
import { NotificationsHostProps } from 'piral';
import { createStyles, rem, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'fixed',
    right: theme.spacing.md,
    width: rem(350),
    zIndex: 10_000,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      width: '90%',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: theme.spacing.md,
    },
  },
}));

export function NotificationsHost({ children }: NotificationsHostProps) {
  const { classes } = useStyles();
  return <Stack className={classes.container}>{children}</Stack>;
}
