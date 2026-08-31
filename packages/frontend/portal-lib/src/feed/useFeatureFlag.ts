import useSWRImmutable from 'swr/immutable';
import { FeedServiceFeatureFlagsResponse } from './types';

const defaultFeed = 'pimon-portal';

export function useFeatureFlag(name: string, feed = defaultFeed) {
  const response = useSWRImmutable<FeedServiceFeatureFlagsResponse>(`/gw/feed/api/v1/feature/${feed}`);
  return response.data?.flags.includes(name) ?? false;
}
