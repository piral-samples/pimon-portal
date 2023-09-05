export interface FeedServiceItemsResponse<T> {
  feed: string;
  items: Array<T>;
}

/**
 * https://feed.piral.cloud/api-docs/#/entities/getPublicEntities
 */
export interface FeedServiceEntity {
  id: string;
  feed: string;
  type: string;
  name: string;
  pilet: string;
  description: string;
  order: number;
  changed: string;
}
