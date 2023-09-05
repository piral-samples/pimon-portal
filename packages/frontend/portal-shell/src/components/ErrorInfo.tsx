import { Container } from '@mantine/core';
import { ErrorInfoProps, SwitchErrorInfo } from 'piral';
import React from 'react';

export function ErrorInfo(props: ErrorInfoProps) {
  return (
    <Container>
      <h2>Error</h2>
      <SwitchErrorInfo {...props} />
    </Container>
  );
}
