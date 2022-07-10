import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import UtilService from '../utils/utils.service';
import { v4 } from 'uuid';
import { confirmUserPrefix } from './auth.constants';
import { ConfigService } from '@nestjs/config';
import { REDIS } from '../redis/redis.constants';
import { RedisClientType } from '@redis/client';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import { UserService } from '../user/user.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly utilService: UtilService,
    private readonly configService: ConfigService,
    @Inject(REDIS) private readonly redis: RedisClientType,
  ) {}
  async signup(data: Prisma.UserCreateInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.userService.createUser(data);
    await this.sendConfirmationMail(
      data.email,
      await this.createConfirmationUrl(user.id),
    );
    return { ...user };
  }

  async validateUser(email: string, password: string): Promise<object> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    delete user.password;
    return user;
  }

  async createConfirmationUrl(id: string) {
    const token = v4();
    await this.redis.setEx(confirmUserPrefix + token, 3600, id);
    return `${this.configService.get('ORIGIN')}/auth/confirm/${token}`;
  }

  async sendConfirmationMail(to: string, url: string) {
    return this.utilService.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<a href="${url}">${url}</a>`, // html body
    });
  }
  async confirmUser({ token }: ConfirmUserDto) {
    const id = await this.redis.v4.get(confirmUserPrefix + token);
    await this.userService.updateUser(id, { confirmed: true });
    await this.redis.del(confirmUserPrefix + token);
    return { success: true };
  }
}
