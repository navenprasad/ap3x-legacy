import { Injectable } from '@nestjs/common';
import { TodoListItem, Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async getTodoList(): Promise<TodoListItem[]> {
    const todo_list_items = await this.prisma.todoListItem.findMany();
    return todo_list_items;
  }
  getHello(): string {
    return 'Hello World!';
  }

  getUserToken(): any {
    const payload = {
      client_id: 'account',
      client_secret: 'QBoSKr3GkfojR5XyifmukppifPEmblix',
      grant_type: 'client_credentials',
      username: 'naven',
      password: 'chelsea',
    };

    return this.httpService
      .post(
        'http://localhost:8080/realms/ap3x/protocol/openid-connect/token',
        payload,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .pipe(map((response) => response.data));
  }
}
