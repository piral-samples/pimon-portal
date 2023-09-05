import React, { PropsWithChildren, useCallback } from 'react';
import { usePiletApi } from 'piral-core';
import { SWRConfig } from 'swr';

export function AppSwrConfig({ children }: PropsWithChildren) {
  const { fetch } = usePiletApi();
  const fetcher = useCallback(
    async (path: string) => {
      const response = await fetch(path);

      if (response.code >= 400) {
        throw new Error(`Request failed with status code ${response.code} ${response.text}.`);
      }

      return response.body;
    },
    [fetch],
  );

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
