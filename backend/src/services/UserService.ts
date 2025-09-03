import { AppDataSource } from '../data-source';
import { User } from '../entities/User.entity';
import { Role } from '../entities/Role.entity';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username }, relations: ['roles'] });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.passwordHash || !userData.username || !userData.employeeName) {
      throw new Error('Username, password, and employee name are required.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.passwordHash, salt);

    const newUser = this.userRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async assignRoles(userId: number, roleNames: string[]): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name IN (:...roleNames)', { roleNames })
      .getMany();

    user.roles = roles;
    return this.userRepository.save(user);
  }

  async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
