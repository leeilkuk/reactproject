import { AppDataSource } from '../data-source';
import { Role } from '../entities/Role.entity';

export class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    if (!roleData.name) {
      throw new Error('Role name is required.');
    }

    const newRole = this.roleRepository.create(roleData);
    return this.roleRepository.save(newRole);
  }

  async findById(id: number): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  async updateRole(id: number, roleData: Partial<Role>): Promise<Role | null> {
    await this.roleRepository.update(id, roleData);
    return this.findById(id);
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
