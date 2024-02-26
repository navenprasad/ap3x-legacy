import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { UseGuards } from '@nestjs/common';
import {
  Resource,
  Roles,
  Scopes,
  Unprotected,
  Public,
} from 'nest-keycloak-connect';
import { AuthGuard } from 'nest-keycloak-connect';
@Controller()
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getHello(): string {
    return this.todoService.getHello();
  }

  @Get('todo')
  getTodoList() {
    return this.todoService.getTodoList();
  }
}
