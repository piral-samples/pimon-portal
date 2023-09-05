import { FeedServiceEntity } from './types';

export interface FeedServiceEntitySortOptions<T> {
  type?: string;
  getDefaultOrder?(item: T): number;
}

export function sortByFeedServiceEntity<T>(
  items: Array<T>,
  entities: Array<FeedServiceEntity>,
  getItemName: (item: T) => string | undefined | null,
  options: FeedServiceEntitySortOptions<T> = {},
): Array<T> {
  const { getDefaultOrder = () => Number.MAX_SAFE_INTEGER, type } = options;
  const findEntity = (name) => entities.find((entity) => entity.name === name && (!type || entity.type === type));

  return [...items].sort((a, b) => {
    const aName = getItemName(a);
    const bName = getItemName(b);
    const aOrder = findEntity(aName)?.order ?? getDefaultOrder(a);
    const bOrder = findEntity(bName)?.order ?? getDefaultOrder(b);

    if (aOrder === bOrder) {
      return 0;
    } else if (aOrder < bOrder) {
      return -1;
    } else {
      return 1;
    }
  });
}
