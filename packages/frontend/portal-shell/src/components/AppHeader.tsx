import React from 'react';
import { Burger, createStyles, Header } from '@mantine/core';
import { Logo } from './Logo';

const useStyles = createStyles((theme) => ({
  header: {
    zIndex: 100,
    display: 'flex',
    gap: theme.spacing.xl,
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: '#d75352',
    borderBottomWidth: 0,
    boxShadow: theme.shadows.xl,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      boxShadow: 'initial',
    },
  },

  burgerClosed: {
    visibility: 'hidden',
  },
}));

export interface AppHeaderProps {
  showBurger?: boolean;
  isBurgerOpen?: boolean;
  onBurgerClick?(): void;
}

export function AppHeader({ showBurger = false, isBurgerOpen = false, onBurgerClick }: AppHeaderProps) {
  const { classes } = useStyles();

  return (
    <Header className={classes.header} height={60} px="lg">
      <Burger
        className={showBurger ? '' : classes.burgerClosed}
        color="white"
        size="sm"
        opened={isBurgerOpen}
        onClick={onBurgerClick}
      />
      <Logo />
    </Header>
  );
}
