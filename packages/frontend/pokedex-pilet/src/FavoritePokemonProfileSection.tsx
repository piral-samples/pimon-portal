import { SimpleGrid, Stack } from '@mantine/core';
import React from 'react';
import { ExtensionComponentProps } from '@smapiot/pimon-portal-shell';
import { PokemonCard } from './PokemonCard';
import { EmptyState, SectionHeader, SkeletonText } from '@smapiot/pimon-portal-lib';

export function FavoritePokemonProfileSection({ params }: ExtensionComponentProps<{ profile?: any }>) {
  if (!params.profile) {
    return <SkeletonText />;
  }

  return (
    <Stack>
      <SectionHeader title="Favorite Pokémon" subtitle="The user's favorite Pokémon." />

      {params.profile?.favoritePokemon.length ? (
        <SimpleGrid
          cols={5}
          breakpoints={[
            { maxWidth: 'xs', cols: 1 },
            { maxWidth: 'sm', cols: 2 },
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'lg', cols: 3 },
            { maxWidth: 'xl', cols: 4 },
          ]}>
          {params.profile.favoritePokemon.map((pokemonId) => (
            <PokemonCard pokemonId={pokemonId} key={pokemonId} />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState title="No Favorite Pokémon" details="This user hasn't favorited any Pokémon yet..." center />
      )}
    </Stack>
  );
}

export default FavoritePokemonProfileSection;
