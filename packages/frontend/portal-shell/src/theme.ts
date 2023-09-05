import { MantineThemeOverride, rem } from '@mantine/core';

export const appTheme: MantineThemeOverride = {
  primaryColor: 'red',
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colorScheme === 'light' ? '#FDFDFD' : theme.colors.dark[9],
    },
  }),
  components: {
    NavLink: {
      // This styles any NavLink to resemble the design found at https://ui.mantine.dev/component/navbar-links-group.
      styles: (theme) => ({
        root: {
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        },
        children: {
          borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          padding: 0,
          marginLeft: rem(30),
        },
      }),
    },
  },
  colors: {
    red: [
      'rgba(227, 135, 134, 1)',
      'rgba(223, 117, 117, 1)',
      'rgba(219, 100, 99, 1)',
      'rgba(215, 83, 82, 1)',
      '#d75352',
      'rgba(215, 83, 82, 1)',
      'rgba(194, 75, 74, 1)',
      'rgba(172, 66, 66, 1)',
      'rgba(151, 58, 57, 1)',
    ],
  },
};
