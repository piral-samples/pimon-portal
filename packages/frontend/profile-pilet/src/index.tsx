import React from 'react';
import type { PiletApi } from '@smapiot/pimon-portal-shell';
import { MenuNavLink, withPiletApi } from '@smapiot/pimon-portal-lib';
import { IconIdBadge2 } from '@tabler/icons-react';
import FavoritePokemonButton from './FavoritePokemonButton';
import ProfileLinkButton from './ProfileLinkButton';
import ProfileTile from './ProfileTile';

const Profiles = React.lazy(() => import('./ProfilesPage'));
const ProfileDetails = React.lazy(() => import('./ProfileDetailsPage'));

export function setup(app: PiletApi) {
  app.registerPage('/profiles', withPiletApi(Profiles));
  app.registerPage('/profiles/:id', withPiletApi(ProfileDetails));

  app.registerExtension('pokemon-card-actions', withPiletApi(FavoritePokemonButton));
  app.registerExtension('user-profile', withPiletApi(ProfileLinkButton));
  app.registerMenu(() => <MenuNavLink to="/profiles" match="/profiles" label="Profiles" icon={IconIdBadge2} />, {
    name: 'profiles',
  });

  app.registerTile(withPiletApi(ProfileTile));
}
