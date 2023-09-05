import useSWR from 'swr';
import { Profile, ProfileUpdate } from './types';
import { ActionIcon, Skeleton } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import React, { SyntheticEvent } from 'react';
import { ExtensionComponentProps } from '@smapiot/pimon-portal-shell';
import { usePiletApi } from '@smapiot/pimon-portal-lib';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';

export function FavoritePokemonButton({ params }: ExtensionComponentProps<{ pokemon: any }>) {
  const { getUser, fetch } = usePiletApi();
  const { mutate } = useSWRConfig();
  const userId = getUser()?.id ?? '';
  const { data, error } = useSWR<Profile>(`/gw/portal/api/v1/users/${userId}/profile`);
  const isFavoritePokemon = data?.favoritePokemon.includes(params.pokemon.id);

  const updateMutation = useSWRMutation('/gw/portal/api/v1/profiles', async (_, { arg }: { arg: ProfileUpdate }) => {
    const response = await fetch<Profile>(`/gw/portal/api/v1/users/${userId}/profile`, { body: arg, method: 'put' });
    const updatedProfile = response.body;

    if (response.code >= 400) {
      throw new Error(`Updating the profile failed with status code ${response.code}.`);
    }

    mutate(`/gw/portal/api/v1/users/${userId}/profile`, updatedProfile, { revalidate: false });
  });

  const handleClick = (e: SyntheticEvent) => {
    if (!data) {
      return;
    }

    const newFavoritePokemons = isFavoritePokemon
      ? data.favoritePokemon.filter((pokemonId) => pokemonId !== params.pokemon.id)
      : [...data.favoritePokemon, params.pokemon.id];

    updateMutation.trigger({ ...data, favoritePokemon: newFavoritePokemons });

    // This extension is hosted in an <a> tag. Prevent navigation here.
    e.preventDefault();
    e.stopPropagation();
  };

  if (!data && error) {
    return null;
  }

  return (
    <Skeleton visible={!data && !error} width="initial">
      <ActionIcon
        variant="transparent"
        onClick={handleClick}
        loading={updateMutation.isMutating}
        disabled={updateMutation.isMutating}>
        {isFavoritePokemon ? <IconStarFilled size="1.2rem" /> : <IconStar size="1.2rem" />}
      </ActionIcon>
    </Skeleton>
  );
}

export default FavoritePokemonButton;
