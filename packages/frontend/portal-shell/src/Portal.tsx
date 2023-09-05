import { createStandardApi } from 'piral';
import { createInstance, Piral } from 'piral-core';
import { createFetchApi } from 'piral-fetch';
import React, { useMemo } from 'react';
import {
  DashboardContainer,
  DashboardTile,
  ErrorInfo,
  Layout,
  LoadingIndicator,
  MenuContainer,
  MenuItem,
  ModalsDialog,
  ModalsHost,
  NotificationsHost,
  NotificationsToast,
  NotFoundError,
} from './components';
import { defaultMenuItems } from './defaults';
import { useAuth } from './auth';
import { createAuthApi } from 'piral-auth';

const feedUrl = 'YOUR_FEED_URL_HERE/api/v1/pilet/pimon-portal';

export function Portal() {
  const { token, tokenBody } = useAuth();
  const instance = useMemo(() => {
    return createInstance({
      state: {
        components: {
          DashboardContainer,
          DashboardTile,
          ErrorInfo,
          Layout,
          LoadingIndicator,
          MenuContainer,
          MenuItem,
          ModalsDialog,
          ModalsHost,
          NotificationsHost,
          NotificationsToast,
        },
        errorComponents: {
          not_found: NotFoundError,
        },
      },
      plugins: [
        ...createStandardApi({
          menu: { items: defaultMenuItems },
        }),
        createFetchApi({
          default: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }),
        createAuthApi({
          user: {
            id: tokenBody?.sub ?? '',
            firstName: '',
            lastName: '',
            mail: '',
            language: '',
            features: {},
            permissions: {},
          },
        }),
      ],
      requestPilets() {
        return fetch(feedUrl, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((res) => res.items);
      },
    });
  }, [token]);

  return <Piral instance={instance} />;
}

export default Portal;
