import { Button, Image, Skeleton, Stack, Text } from '@mantine/core';
import { ErrorState, StandardCardContent, usePiletApi } from '@smapiot/pimon-portal-lib';
import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';
import { Pokemon } from './types';
import useSWRImmutable from 'swr/immutable';
import { Link } from 'react-router-dom';
import { IconQuestionMark } from '@tabler/icons-react';

export function PokedexTile() {
  const { meta } = usePiletApi();
  const pokemonId = meta.config.pokemonOfTheDay ?? 54;
  const { isLoading, data, error } = useSWRImmutable<Pokemon>(`/gw/pokeapi/api/v2/pokemon/${pokemonId}`);
  const [show, setShow] = useState(false);

  return (
    <StandardCardContent icon={<IconQuestionMark />} header="Who's that Pokémon?">
      {!data && error && <ErrorState content="Failed to load pokemon." />}
      {data && !error && (
        <Stack align="center">
          <Link to={`/pokedex/${pokemonId}`} style={{ textDecoration: 'none', color: '#000000' }}>
            <Image
              style={{ filter: show ? undefined : 'brightness(0%)' }}
              src={`/gw/assets/sprites/pokemon/${pokemonId}.png`}
              height={100}
              width={100}
            />
          </Link>

          {!show && <Button onClick={() => setShow(true)}>Reveal</Button>}

          {show && (
            <Skeleton visible={isLoading} width="initial">
              <Text weight={500} size="lg" mt="md">
                It's {capitalize(data?.name) ?? '--'}! 🎉
              </Text>
            </Skeleton>
          )}
        </Stack>
      )}
    </StandardCardContent>
  );
}

export default PokedexTile;
