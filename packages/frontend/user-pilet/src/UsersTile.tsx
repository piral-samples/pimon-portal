import { useMantineTheme } from '@mantine/core';
import { EmptyState, ErrorState, StandardCardContent, formatDate } from '@smapiot/pimon-portal-lib';
import { IconUsers } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useSWR from 'swr';

export function UsersTile() {
  const theme = useMantineTheme();
  const { data: users, error } = useSWR('/gw/portal/api/v1/users');
  const data = useMemo(() => {
    if (!users) {
      return [];
    }

    const registrationDates = users.map((user) => user.createdAt.split('T')[0]).map((date) => formatDate(date));
    const registrationsPerDate = registrationDates.reduce((result, date) => {
      result[date] = (result[date] || 0) + 1;
      return result;
    }, {});

    const result = Object.entries(registrationsPerDate).map(([date, registrations]) => ({
      Date: date,
      Registrations: registrations,
    }));
    return result;
  }, [users]);

  return (
    <StandardCardContent header="User Registrations" icon={<IconUsers />}>
      {users && users.length === 0 && !error && <EmptyState title="No Users" details="No users exist... Somehow..." />}
      {!users && error && <ErrorState content="Failed to load users." />}

      {users && !error && (
        <ResponsiveContainer height={200} width="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Registrations" stroke={theme.colors.red[5]} fill={theme.colors.red[1]} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </StandardCardContent>
  );
}

export default UsersTile;
