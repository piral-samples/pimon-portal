import { Navbar, ScrollArea, createStyles, NavbarProps } from '@mantine/core';
import { Menu as PiralMenu } from 'piral';
import React from 'react';
import { Logo } from './Logo';

const useStyles = createStyles((theme) => {
  return {
    navbar: {
      backgroundColor: theme.colors.red[5],
      boxShadow: theme.shadows.xl,
      borderRightWidth: 0,
    },

    header: {
      backgroundColor: theme.colors.red[4],
      boxShadow: theme.shadows.sm,
    },

    main: {
      boxShadow: theme.shadows.sm,
    },

    footer: {
      backgroundColor: theme.colors.red[6],
    },
  };
});

export interface SideNavProps extends Omit<NavbarProps, 'children'> {
  minimal: boolean;
}

export function SideNav({ minimal, ...rest }: SideNavProps) {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar} {...rest}>
      {!minimal && (
        <Navbar.Section className={classes.header} p="sm">
          <Logo />
        </Navbar.Section>
      )}

      <Navbar.Section className={classes.main} component={ScrollArea} px="sm" py="sm" grow>
        <PiralMenu type="general" />
      </Navbar.Section>

      <Navbar.Section className={classes.footer} px="sm" py="sm">
        <PiralMenu type="user" />
      </Navbar.Section>
    </Navbar>
  );
}
