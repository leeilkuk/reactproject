import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';
import { Menu } from './Menu.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string; // e.g., 'ADMIN', 'INTERMEDIATE_MANAGER', 'USER'

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
