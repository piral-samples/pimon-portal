import { Button, Container, PasswordInput, Stack, TextInput, createStyles, Image, Flex } from '@mantine/core';
import React, { SyntheticEvent, useMemo, useState } from 'react';
import { useAuth } from './auth';
import { Page } from '@smapiot/pimon-portal-lib';
import { Logo } from './components/Logo';

const useStyles = createStyles(() => {
  return {
    footer: {
      bottom: 0,
      position: 'absolute',
      width: '100%',
      overflow: 'hidden',
      maxHeight: '120px',
    },
  };
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function LandingPage() {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    setFailed(!success);
  };

  const randomPokemon: Array<number> = useMemo(() => {
    const result: Array<number> = [];
    for (let i = 0; i < 14; i++) {
      let pokemonId = getRndInteger(1, 151);
      while (result.includes(pokemonId)) {
        pokemonId = getRndInteger(1, 151);
      }
      result.push(pokemonId);
    }
    return result;
  }, []);

  return (
    <>
      <Page title={<Logo />}>
        <Container size="sm">
          <form onSubmit={handleLogin}>
            <Stack>
              <h1>Login</h1>
              <TextInput
                error={failed}
                placeholder="Username"
                value={username}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
              />
              <PasswordInput
                error={failed ? 'The username or password was wrong.' : false}
                placeholder="Password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button loading={loading} disabled={!username || !password || loading} type="submit">
                Login
              </Button>
            </Stack>
          </form>
        </Container>
      </Page>
      <Flex className={classes.footer} justify="space-evenly" wrap="wrap">
        {randomPokemon.map((pokemonId) => (
          <Image
            src={`/gw/assets/sprites/pokemon/${pokemonId}.png`}
            width="120px"
            height="120px"
            fit="contain"
            alt={`${pokemonId}`}
            withPlaceholder
            key={pokemonId}
          />
        ))}
      </Flex>
    </>
  );
}

export default LandingPage;
