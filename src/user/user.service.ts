import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async createUser(
    user: Prisma.UserCreateInput,
  ): Promise<{ id: string; firstname: string; lastname: string }> {
    return await this.prisma.user.create({
      data: user,
      select: { id: true, firstname: true, lastname: true },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({ data, where: { id } });
  }

  async userExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.count({ where: { email } }));
  }
}
