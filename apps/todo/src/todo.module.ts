import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
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

@Module({
  imports: [
    PrismaModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080', // Make sure the URL is correct
      realm: 'ap3x',
      clientId: 'ap3x-client',
      secret: 'ZdUie81I5DnsF1s0eU0K9cfQog2mf2Kf',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    PrismaService,
    // These are in order, see https://docs.nestjs.com/guards#binding-guards
    // for more information
    //
    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class TodoModule {}
