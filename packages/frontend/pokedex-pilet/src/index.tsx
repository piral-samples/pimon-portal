import React from 'react';
import type { PiletApi } from '@smapiot/pimon-portal-shell';
import { MenuNavLink, withPiletApi } from '@smapiot/pimon-portal-lib';
import { IconVocabulary } from '@tabler/icons-react';
import FavoritePokemonProfileSection from './FavoritePokemonProfileSection';

const PokedexPage = React.lazy(() => import('./PokedexPage'));
const PokemonDetailsPage = React.lazy(() => import('./PokemonDetailsPage'));
const PokedexTile = React.lazy(() => import('./PokedexTile'));

export function setup(app: PiletApi) {
  app.registerPage('/pokedex', withPiletApi(PokedexPage));
  app.registerPage('/pokedex/:id', withPiletApi(PokemonDetailsPage));

  app.registerExtension('profile-details', withPiletApi(FavoritePokemonProfileSection));

  app.registerMenu(() => <MenuNavLink to="/pokedex" match="/pokedex" label="Pokedex" icon={IconVocabulary} />, {
    name: 'pokedex',
  });

  app.registerTile(withPiletApi(PokedexTile));
}
