import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { Pokemon } from './types';
import { Badge, Card, Center, Flex, Group, Image, Skeleton, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { TypeBadge } from './TypeBadge';
import { ErrorState, usePiletApi } from '@smapiot/pimon-portal-lib';

export interface PokemonCardProps {
  pokemonId: number;
  withActions?: boolean;
}

export function PokemonCard({ pokemonId, withActions }: PokemonCardProps) {
  const { isLoading, data, error } = useSWRImmutable<Pokemon>(`/gw/pokeapi/api/v2/pokemon/${pokemonId}`);
  const { Extension } = usePiletApi();

  return (
    <Card shadow="sm" padding="xl">
      {!data && error && <ErrorState content="Failed to load pokemon." />}
      {data && !error && (
        <Link to={`/pokedex/${pokemonId}`} style={{ textDecoration: 'none' }}>
          {withActions && (
            <Card.Section p="md">
              <Flex justify="flex-end">
                {data && <Extension name="pokemon-card-actions" params={{ pokemon: data }} />}
              </Flex>
            </Card.Section>
          )}

          <Card.Section>
            <Center my="xl">
              <Image
                sx={(theme) => ({ backgroundColor: theme.colors.gray[3], borderRadius: '100%' })}
                src={`/gw/assets/sprites/pokemon/${pokemonId}.png`}
                width="128px"
                height="128px"
                fit="contain"
                alt={`${pokemonId}`}
                withPlaceholder
              />
            </Center>
          </Card.Section>

          <Group position="apart" my="md">
            <Text fz="lg" tt="capitalize" size="lg" fw={600}>
              {data?.name ?? '--'}
            </Text>
            <Badge variant="light" color="gray">
              #{pokemonId}
            </Badge>
          </Group>

          <Skeleton visible={isLoading}>
            <Group spacing="xs">
              {data?.types.map((type) => <TypeBadge key={type.type.name} type={type.type.name} />)}
            </Group>
          </Skeleton>
        </Link>
      )}
    </Card>
  );
}
