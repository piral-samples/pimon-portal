import { ActionIcon, Skeleton, Tooltip } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import React from 'react';
import { ExtensionComponentProps } from '@smapiot/pimon-portal-shell';
import { Link } from 'react-router-dom';

export function ProfileLinkButton({ params }: ExtensionComponentProps<{ user?: any }>) {
  return (
    <Skeleton visible={!params.user} width="initial">
      <Link to={`/profiles/${params.user.id}`} style={{ textDecoration: 'none', color: '#000000' }}>
        <Tooltip label="Profile" withArrow>
          <ActionIcon variant="subtle">
            <IconUser size="1.2rem" />{' '}
          </ActionIcon>
        </Tooltip>
      </Link>
    </Skeleton>
  );
}

export default ProfileLinkButton;
