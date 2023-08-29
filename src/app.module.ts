import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RieltorsModule } from './rieltors/rieltors.module';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import PrismaService from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ObjectModule } from './object/object.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    AuthModule,
    RieltorsModule,
    AdminsModule,
    ClientsModule,
    CompaniesModule,
    ObjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
