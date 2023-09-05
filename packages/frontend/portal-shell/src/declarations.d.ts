import type { LinkProps } from 'react-router-dom';

declare module '*.svg';
declare module '*.png';

declare module 'piral-dashboard/lib/types' {
  interface PiralCustomTilePreferences {
    /**
     * If specified, makes the card a link card which navigates the user to this URL when clicked.
     */
    to?: LinkProps['to'];
  }
}

declare module 'piral-menu/lib/types' {
  interface PiralCustomMenuSettings extends MainMenuItem {
    /**
     * A name for the menu item, used for ordering the menu item via the feed service's entity feature.
     */
    name?: string;
  }
}
