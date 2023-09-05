import React from 'react';
import { SimpleGrid } from '@mantine/core';
import range from 'lodash/range';
import { PokemonCard } from './PokemonCard';
import { Page, SectionHeader, usePiletApi } from '@smapiot/pimon-portal-lib';

export default function PokedexPage() {
  const { meta } = usePiletApi();
  const pokedexSize = meta.config.pokedexSize ?? 9;

  return (
    <Page title="Pokédex">
      <SectionHeader title="Pokédex" subtitle="Publicly available Pokémon information." />
      <SimpleGrid
        cols={5}
        breakpoints={[
          { maxWidth: 'xs', cols: 1 },
          { maxWidth: 'sm', cols: 2 },
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'lg', cols: 3 },
          { maxWidth: 'xl', cols: 4 },
        ]}>
        {range(1, pokedexSize + 1).map((i) => (
          <PokemonCard key={i} pokemonId={i} withActions />
        ))}
      </SimpleGrid>
    </Page>
  );
}
