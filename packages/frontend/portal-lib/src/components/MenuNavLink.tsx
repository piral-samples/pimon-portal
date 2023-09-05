import React, { ReactNode, ComponentType } from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { Group, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.white,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colors.red[1],
      },
    },

    linkActive: {
      backgroundColor: theme.colors.red[6],
    },
  };
});

export interface MenuNavLinkProps {
  isExact?: boolean;
  match?: Parameters<typeof useRouteMatch>[0];
  to?: LinkProps['to'];
  label?: ReactNode;
  icon?: ComponentType<any>;
  onClick?: () => void;
}

export function MenuNavLink({ isExact, match, to, label, icon, onClick }: MenuNavLinkProps) {
  const { classes, cx } = useStyles();
  const routeMatch = !!match && useRouteMatch(match);
  const isActive = Boolean(routeMatch && isExact ? routeMatch?.isExact : routeMatch);
  const Icon = icon;
  const content = (
    <Group className={cx(classes.link, { [classes.linkActive]: isActive })} spacing="xs" onClick={onClick}>
      {Icon && <Icon size="1rem" />}
      <span>{label}</span>
    </Group>
  );

  return to ? (
    <Link to={to} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  ) : (
    content
  );
}
