import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) { }

  async getUserById(id: string) {
    return await this.usersRepo.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      }
    });
  }
}
