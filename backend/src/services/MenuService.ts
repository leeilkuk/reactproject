import { AppDataSource } from '../data-source';
import { Menu } from '../entities/Menu.entity';
import { Role } from '../entities/Role.entity';

export class MenuService {
  private menuRepository = AppDataSource.getTreeRepository(Menu);
  private roleRepository = AppDataSource.getRepository(Role);

  async findTrees(): Promise<Menu[]> {
    return this.menuRepository.findTrees();
  }

  async createMenu(menuData: Partial<Menu>, parentId?: number): Promise<Menu> {
    const menu = this.menuRepository.create(menuData);
    if (parentId) {
      const parent = await this.menuRepository.findOneBy({ id: parentId });
      if (parent) {
        menu.parent = parent;
      }
    }
    return this.menuRepository.save(menu);
  }

  async assignRoles(menuId: number, roleNames: string[]): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
        where: { id: menuId },
        relations: ['roles']
    });
    if (!menu) {
      throw new Error('Menu not found');
    }

    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name IN (:...roleNames)', { roleNames })
      .getMany();

    menu.roles = roles;
    return this.menuRepository.save(menu);
  }
}
