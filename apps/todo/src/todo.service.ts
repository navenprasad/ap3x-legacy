// todo.service.ts
import { Injectable } from '@nestjs/common';
import { TodoListItem, Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodoList(): Promise<TodoListItem[]> {
    const todo_list_items = await this.prisma.todoListItem.findMany();
    return todo_list_items;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
