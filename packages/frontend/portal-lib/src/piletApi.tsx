import React, { PropsWithChildren, createContext, useContext } from 'react';
import type { PiletApi } from '@smapiot/pimon-portal-shell';
import type { BaseComponentProps } from 'piral-core';

const piletApiContext = createContext<PiletApi>(undefined!);

export function withPiletApi<T>(Component: React.ComponentType<T>) {
  return (props: PropsWithChildren<T> & BaseComponentProps) => (
    <piletApiContext.Provider value={props.piral}>
      <Component {...props} />
    </piletApiContext.Provider>
  );
}

export function usePiletApi() {
  return useContext(piletApiContext);
}
