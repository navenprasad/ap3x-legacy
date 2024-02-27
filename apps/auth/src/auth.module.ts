// auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core'; // Import APP_GUARD from @nestjs/core
import { AuthController } from './auth.controller'; // Import AuthController
import { AuthService } from './auth.service'; // Import AuthService
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [
    ConfigModule,
    HttpModule, // Add HttpModule here
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.get('KC_URL'),
        realm: configService.get('KC_REALM'),
        clientId: configService.get('KC_CLIENT_ID'),
        secret: configService.get('KC_CLIENT_SECRET'),
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.ONLINE,
      }),
    }),
  ],
  providers: [
    AuthService, // Add AuthService here
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
  controllers: [AuthController], // Add AuthController here
  exports: [KeycloakConnectModule], // Export KeycloakConnectModule
})
export class AuthModule {}
