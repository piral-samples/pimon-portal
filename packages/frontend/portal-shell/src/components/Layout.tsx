import React, { useEffect } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { LayoutProps } from 'piral-core';
import { Modals, Notifications } from 'piral';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { SideNav } from './SideNav';
import { AppHeader } from './AppHeader';
import { AppSwrConfig } from './AppSwrConfig';

const minimalBreakpoint = 'sm';

export function Layout({ children }: LayoutProps) {
  const [isNavOpen, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const minimal = useMediaQuery(`(max-width: ${theme.breakpoints[minimalBreakpoint]})`);
  useEffect(close, [minimal]);

  return (
    <AppSwrConfig>
      <AppShell
        padding={0}
        navbarOffsetBreakpoint={minimalBreakpoint}
        header={minimal ? <AppHeader showBurger isBurgerOpen={isNavOpen} onBurgerClick={toggle} /> : undefined}
        navbar={
          <SideNav
            width={{ base: '100%', [minimalBreakpoint]: 300 }}
            minimal={minimal}
            hidden={minimal && !isNavOpen}
          />
        }>
        <Notifications />
        <Modals />
        {children}
      </AppShell>
    </AppSwrConfig>
  );
}
