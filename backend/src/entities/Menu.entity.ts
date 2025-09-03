import { Entity, Column, ManyToMany, JoinTable, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Role } from './Role.entity';

export enum MenuType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

@Entity()
@Tree('closure-table')
export class Menu extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MenuType,
    default: MenuType.INTERNAL,
  })
  type: MenuType;

  @Column({ nullable: true })
  path: string; // URL for internal routes or external links

  @Column({ nullable: true })
  icon: string; // Bootstrap icon class name, e.g., 'bi-speedometer2'

  @Column({ default: 0 })
  order: number; // To sort menus at the same level

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;

  @ManyToMany(() => Role, (role) => role.menus, { cascade: true })
  @JoinTable({
    name: 'menu_roles',
    joinColumn: { name: 'menuId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];
}
