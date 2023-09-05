import { Box, Group, Title, createStyles } from '@mantine/core';
import React from 'react';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => {
  const clipPath = 'polygon(0 0, 100% 0%, calc(100% - 56px) 100%, 0% 100%)';

  return {
    outer: {
      position: 'sticky',
      top: 0,
      filter: `drop-shadow(${theme.spacing.lg} ${theme.spacing.xs} ${theme.spacing.xs} rgba(0, 0, 0, 0.15))`,
      zIndex: 100,

      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        top: 60,
        zIndex: 99,
      },
    },

    fakeBorder: {
      padding: '0 1px 1.5px 0',
      backgroundColor: theme.colors.red[6],
      clipPath: clipPath,
    },

    header: {
      backgroundColor: theme.colors.red[4],
      color: theme.white,
      clipPath: clipPath,
      padding: theme.spacing.sm,
      paddingLeft: theme.spacing.xl,
    },
  };
});

export interface PageHeaderProps {
  title?: ReactNode;
}

export function PageHeader({ title }: PageHeaderProps) {
  const { classes } = useStyles();

  return (
    <Box className={classes.outer}>
      <Box className={classes.fakeBorder}>
        <Box h={56} className={classes.header}>
          <Group position="apart" pr="60px">
            <Title order={2} size="h3">
              {title}
            </Title>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}
