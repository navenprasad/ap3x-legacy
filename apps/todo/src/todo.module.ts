import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigService available across your app
    }),
    HttpModule,
    PrismaModule,
    ConfigModule, // Import ConfigModule here
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule], // And here
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log('KC_URL:', configService.get('KC_URL')); // Log KC_URL
        // console.log('KC_REALM:', configService.get('KC_REALM')); // Log KC_REALM
        // console.log('KC_CLIENT_ID:', configService.get('KC_CLIENT_ID')); // Log KC_CLIENT_ID
        // console.log('KC_CLIENT_SECRET:', configService.get('KC_CLIENT_SECRET')); // Log KC_SECRET

        return {
          authServerUrl: configService.get('KC_URL'), // Read from env
          realm: configService.get('KC_REALM'), // Read from env
          clientId: configService.get('KC_CLIENT_ID'), // Read from env
          secret: configService.get('KC_CLIENT_SECRET'), // Read from env
          policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
          tokenValidation: TokenValidation.ONLINE,
        };
      },
    }),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    PrismaService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class TodoModule {}
