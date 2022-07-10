import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import UtilService from '../utils/utils.service';
import { v4 } from 'uuid';
import { confirmUserPrefix } from './auth.constants';
import { ConfigService } from '@nestjs/config';
import { REDIS } from '../redis/redis.constants';
import { RedisClientType } from '@redis/client';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import LoginDto from './dto/Login.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilService,
    private readonly config: ConfigService,
    @Inject(REDIS) private readonly redis: RedisClientType,
  ) {}
  async signup(data: Prisma.UserCreateInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data,
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    await this.sendConfirmationMail(
      data.email,
      await this.createConfirmationUrl(user.id),
    );
    return { ...user };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
      select: { id: true, password: true, firstname: true, lastname: true },
    });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      return null;
    }
    delete user.password;
    return user;
  }

  async userExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.count({ where: { email } }));
  }

  async createConfirmationUrl(id: string) {
    const token = v4();
    await this.redis.setEx(confirmUserPrefix + token, 3600, id);
    return `${this.config.get('ORIGIN')}/auth/confirm/${token}`;
  }

  async sendConfirmationMail(to: string, url: string) {
    return this.utils.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<a href="${url}">${url}</a>`, // html body
    });
  }
  async confirmUser({ token }: ConfirmUserDto) {
    const id = await this.redis.v4.get(confirmUserPrefix + token);
    await this.prisma.user.update({ data: { confirmed: true }, where: { id } });
    await this.redis.del(confirmUserPrefix + token);
    return { success: true };
  }
}
