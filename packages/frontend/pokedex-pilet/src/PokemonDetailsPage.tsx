import { Skeleton, Group, Table, Card, Image, Text, createStyles, rem, Grid, Flex } from '@mantine/core';
import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { useParams } from 'react-router';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Pokemon, PokemonMove, PokemonSpecies } from './types';
import capitalize from 'lodash/capitalize';
import { TypeBadge } from './TypeBadge';
import { ErrorState, Page, SectionHeader } from '@smapiot/pimon-portal-lib';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  header: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
}));

export default function PokemonDetailsPage() {
  const { id: pokemonId } = useParams<{ id: string }>();
  const { classes } = useStyles();
  const { isLoading, data, error } = useSWRImmutable<Pokemon>(`/gw/pokeapi/api/v2/pokemon/${pokemonId}`);
  const pokemonStats = data?.stats.map((stat) => ({ name: capitalize(stat.stat.name), x: stat.base_stat }));

  return (
    <Page title={`#${pokemonId} ${capitalize(data?.name)}`}>
      {!data && error && <ErrorState content="Failed to load pokemon." />}
      {data && !error && (
        <>
          <SectionHeader
            title={`#${pokemonId} ${capitalize(data?.name)}`}
            subtitle={`Details about ${capitalize(data?.name)}.`}
          />

          <Grid>
            <Grid.Col span={4}>
              <Card shadow="sm" padding="xl" component="a" sx={{ height: '100%' }}>
                <Group position="apart" sx={{ height: '100%' }}>
                  <Skeleton visible={isLoading} >
                    <Image src={`/gw/assets/sprites/pokemon/${pokemonId}.png`} height={200} width={200} />
                  </Skeleton>
                  <Text>
                    <Skeleton visible={isLoading}>{getEngDescrption(pokemonId)}</Skeleton>
                  </Text>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={4}>
              <Card shadow="sm" padding="xl" component="a" sx={{ height: '100%' }}>
                <h3 className={classes.title}>General Information</h3>

                <Table>
                  <thead>
                    <tr>
                      <th>Trait</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Weight</td>
                      <td>
                        <Skeleton visible={isLoading}>{data?.weight}</Skeleton>
                      </td>
                    </tr>
                    <tr>
                      <td>Height</td>
                      <td>
                        <Skeleton visible={isLoading}>{data?.height}</Skeleton>
                      </td>
                    </tr>
                    <tr>
                      <td>Base Experience</td>
                      <td>
                        <Skeleton visible={isLoading}>{data?.base_experience}</Skeleton>
                      </td>
                    </tr>
                    <tr>
                      <td>Abilities</td>
                      <td>
                        <Skeleton visible={isLoading}>
                          {data?.abilities.map((abilitiy) => capitalize(abilitiy.ability.name)).join(', ')}
                        </Skeleton>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Grid.Col>

            <Grid.Col span={4}>
              <Card shadow="sm" padding="xl" component="a" sx={{ height: '100%' }}>
                <Flex justify="center" align="flex-start">
                  <Skeleton visible={isLoading}>
                    <ResponsiveContainer height={300} width="100%">
                      <RadarChart outerRadius="60%" innerRadius="5%" data={pokemonStats}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar dataKey="x" stroke="green" fill="green" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Skeleton>
                </Flex>
              </Card>
            </Grid.Col>
          </Grid>
          <SectionHeader title="Moves" subtitle={`Moves which can be learned by ${capitalize(data?.name)}.`} />
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Move</th>
                <th>Accuracy</th>
                <th>Power</th>
                <th>PP</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>{data?.moves.map((move) => <PokemonMoveRow name={move.move.name} key={move.move.name} />)}</tbody>
          </Table>
        </>
      )}
    </Page>
  );
}

interface PokemonMoveRowProps {
  name: string;
}

function PokemonMoveRow({ name }: PokemonMoveRowProps) {
  const { isLoading, data } = useSWRImmutable<PokemonMove>(`/gw/pokeapi/api/v2/move/${name}`);

  return (
    <tr key={data?.id}>
      <td>
        <Skeleton visible={isLoading}>
          <TypeBadge key={data?.type.name} type={data?.type.name ?? 'gray'} />
        </Skeleton>
      </td>
      <td>
        <Skeleton visible={isLoading}>{capitalize(data?.name)}</Skeleton>
      </td>
      <td>
        <Skeleton visible={isLoading}>{data?.accuracy ?? '--'}</Skeleton>
      </td>
      <td>
        <Skeleton visible={isLoading}>{data?.power ?? '--'}</Skeleton>
      </td>
      <td>
        <Skeleton visible={isLoading}>{data?.pp}</Skeleton>
      </td>
      <td>
        <Skeleton visible={isLoading}>{capitalize(data?.damage_class.name)}</Skeleton>
      </td>
    </tr>
  );
}

function getEngDescrption(pokemonId: string) {
  const { data } = useSWRImmutable<PokemonSpecies>(`/gw/pokeapi/api/v2/pokemon-species/${pokemonId}`);
  const engDescription = data?.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en' && entry.version.name === 'red',
  );

  return engDescription ? engDescription[0].flavor_text : '--';
}
