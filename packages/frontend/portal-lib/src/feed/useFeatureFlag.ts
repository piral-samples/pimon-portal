import useSWRImmutable from 'swr/immutable';
import { FeedServiceFeatureFlagsResponse } from './types';

const defaultFeed = process.env.FEED_NAME;

export function useFeatureFlag(name: string, feed = defaultFeed) {
  const response = useSWRImmutable<FeedServiceFeatureFlagsResponse>(`/gw/feed/api/v1/feature/${feed}`);
  return response.data?.flags.includes(name) ?? false;
}
