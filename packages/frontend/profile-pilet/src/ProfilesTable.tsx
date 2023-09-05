import { Table } from '@mantine/core';
import { formatDateTime, formatDate } from '@smapiot/pimon-portal-lib';
import React from 'react';
import { Profile } from './types';
import { Link } from 'react-router-dom';

export interface ProfilesTableProps {
  data: Array<Profile>;
}

export function ProfilesTable({ data }: ProfilesTableProps) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Profile Name</th>
          <th>Bio</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((profile) => (
          <tr key={profile.userId}>
            <td>
              <Link to={`/profiles/${profile.userId}`}>{profile.displayName ?? '--'}</Link>{' '}
            </td>
            <td>{profile.motd ?? '--'}</td>
            <td headers={formatDateTime(profile.createdAt)}>{formatDate(profile.createdAt)}</td>
            <td headers={formatDateTime(profile.updatedAt)}>{formatDate(profile.updatedAt)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
