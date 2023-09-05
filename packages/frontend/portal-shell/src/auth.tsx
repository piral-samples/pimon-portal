import React, { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

const tokenKey = 'pimon-portal:jwt';

export function getToken() {
  return sessionStorage.getItem(tokenKey) ?? undefined;
}

const authContext = createContext<{
  token?: string;
  tokenBody?: {
    sub: string;
    username: string;
    roles: Array<string>;
  };
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
}>(undefined!);

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | undefined>(getToken());

  const login = useCallback(
    async (username: string, password: string) => {
      if (token) {
        console.info('Login: Already logged in.');
        return true;
      }

      try {
        const response = await fetch('/gw/portal/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          console.error('Login: Login failed with status:', response.status);
          return false;
        }

        const body = await response.json();
        const token = body.access_token;
        sessionStorage.setItem(tokenKey, token);
        setToken(token);
        console.info('Login: Successfully acquired a token');
        return true;
      } catch (e) {
        console.error('Login: Login failed with an error:', e);
        return false;
      }
    },
    [token],
  );

  const logout = useCallback(() => {
    setToken(undefined);
    sessionStorage.removeItem(tokenKey);
  }, []);

  const tokenBody = useMemo(() => {
    if (!token) {
      return undefined;
    }

    return parseJwt(token);
  }, [token]);

  const contextValue = useMemo(() => ({ token, tokenBody, login, logout }), [token, tokenBody, login, logout]);

  return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
}

/** https://stackoverflow.com/a/38552302 */
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
