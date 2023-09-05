import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { PropsWithChildren, useState } from 'react';
import { appTheme } from './theme';
import { SWRConfig } from 'swr';
import { AuthProvider } from './auth';

export function AppProvider({ children }: PropsWithChildren) {
  const defaultColorScheme = 'light';
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme);
  const toggleColorScheme = (scheme?: ColorScheme) =>
    setColorScheme(scheme ?? colorScheme === 'light' ? 'dark' : 'light');

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...appTheme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <SWRConfig>
          <AuthProvider>{children}</AuthProvider>
        </SWRConfig>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
