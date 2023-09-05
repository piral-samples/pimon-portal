import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type OmitDates<T extends EntityBase> = Omit<T, 'createdAt' | 'updatedAt'>;
export type EntityCreate<T extends EntityBase> = Omit<OmitDates<T>, 'id'>;
export type EntityUpdate<T extends EntityBase> = QueryDeepPartialEntity<OmitDates<T>>;

export abstract class EntityBase {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export abstract class EntityWithIdBase extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
