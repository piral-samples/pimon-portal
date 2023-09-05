import React from 'react';
import { ErrorState } from '@smapiot/pimon-portal-lib';
import notFound from '../assets/not-found.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

export function NotFoundError() {
  return (
    <ErrorState
      title="Not Found"
      content="The page you are looking for does not exist."
      image={notFound}
      primaryAction={
        <Link to="/">
          <Button>Home</Button>
        </Link>
      }
    />
  );
}
