import React from 'react';
import { MenuContainerProps } from 'piral';
import {
  FeedServiceItemsResponse,
  MenuNavLink,
  sortByFeedServiceEntity,
  FeedServiceEntity,
} from '@smapiot/pimon-portal-lib';
import { IconHome } from '@tabler/icons-react';
import useSWRImmutable from 'swr/immutable';
import { Skeleton } from '@mantine/core';

const feedName = process.env.FEED_NAME;

export function MenuContainer({ children, type }: MenuContainerProps) {
  const {
    data: entities,
    error,
    isLoading,
  } = useSWRImmutable<FeedServiceItemsResponse<FeedServiceEntity>>(`/gw/feed/api/v1/entity/${feedName}`);

  const sortedChildren =
    !isLoading && entities
      ? sortByFeedServiceEntity(
          React.Children.toArray(children),
          entities.items,
          (child: any) => child?.props?.meta?.name,
          { type: `menu-${type}` },
        )
      : children;

  if (type === 'general') {
    return (
      <>
        <MenuNavLink to="/" match="/" isExact icon={IconHome} label="Home" />
        <Skeleton visible={isLoading && !error}>{sortedChildren}</Skeleton>
      </>
    );
  }

  return <>{children}</>;
}
