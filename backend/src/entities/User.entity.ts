import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Role } from './Role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column()
  employeeName: string;

  @Column({ nullable: true })
  email: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true, eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];
}
