import {
  OnModuleInit,
  INestApplication,
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable({})
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async cleanDatabase() {
    if (this.configService.get('NODE_ENV') == 'production') return;
    const prisma = new PrismaClient();
    const propertyNames = Object.getOwnPropertyNames(prisma);
    const modelNames = propertyNames.filter(
      (propertyName) => !propertyName.startsWith('_'),
    );

    return Promise.all(modelNames.map((model) => prisma[model].deleteMany()));
  }
}
