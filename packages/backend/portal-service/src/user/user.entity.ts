import { EntityWithIdBase } from '../entities';
import { Column, Entity, OneToOne } from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';

@Entity()
export class UserEntity extends EntityWithIdBase {
  @Column('varchar', { unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column('simple-array')
  roles!: Array<string>;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile?: ProfileEntity;
}
