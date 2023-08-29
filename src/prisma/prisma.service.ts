import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from "@prisma/client"

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
    constructor(){
        super({
          datasources: {
            db: {
              url: 'postgresql://postgres:root@localhost:5332/rieltor-bor?schema=public',
            },
          },
        });
    }
    async onModuleInit() {
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect
    }
  }
