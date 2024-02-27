// todo.module.ts
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/src/auth.module'; // Import AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    PrismaModule,
    AuthModule, // Use AuthModule here
  ],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
