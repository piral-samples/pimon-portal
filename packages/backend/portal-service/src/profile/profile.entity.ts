import { EntityBase } from '../entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class ProfileEntity extends EntityBase {
  @PrimaryColumn()
  userId!: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user?: UserEntity;

  @Column('varchar', { nullable: true })
  displayName?: string | null;

  @Column('varchar', { nullable: true })
  motd?: string | null;

  @Column('simple-json')
  favoritePokemon!: Array<number>;

  @Column('simple-json')
  badges!: Array<number>;

  @Column('varchar', { nullable: true })
  imageBase64Url?: string | null;
}
