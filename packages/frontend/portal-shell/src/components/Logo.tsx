import { Center, Image } from '@mantine/core';
import React from 'react';
import logo from '../assets/logo.png';

export function Logo() {
  return (
    <Center>
      <Image src={logo} height={32} width="auto" fit="contain" />
    </Center>
  );
}
