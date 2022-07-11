import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
    select?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    return await this.prisma.user.findFirst({
      where: { email },
      ...(select && { select }),
    });
  }

  async findById(
    id: string,
    select?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    return await this.prisma.user.findFirst({
      where: { id },
      ...(select && { select }),
    });
  }

  async createUser(
    user: Prisma.UserCreateInput,
    select?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    return await this.prisma.user.create({
      data: user,
      ...(select && { select }),
    });
  }

  async updateUser(
    id: string,
    data: Prisma.UserUpdateInput,
    select?: Prisma.UserSelect,
  ): Promise<Partial<User>> {
    return await this.prisma.user.update({
      data,
      where: { id },
      ...(select && { select }),
    });
  }

  async userExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.count({ where: { email } }));
  }
}
