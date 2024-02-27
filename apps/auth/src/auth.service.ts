import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import * as querystring from 'querystring';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUserToken(username: string, password: string): any {
    const payload = {
      client_id: 'account',
      client_secret: 'QBoSKr3GkfojR5XyifmukppifPEmblix',
      grant_type: 'password',
      username,
      password,
    };

    const base_url = this.configService.get('KC_URL');

    return this.httpService
      .post(
        `${base_url}/realms/ap3x/protocol/openid-connect/token`,
        querystring.stringify(payload),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('There was an error during the request:', error);
          return throwError(error);
        }),
      );
  }

  getUserInfo(accessToken: string): any {
    const base_url = this.configService.get('KC_URL');

    return this.httpService
      .get(`${base_url}/realms/ap3x/protocol/openid-connect/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('There was an error during the request:', error);
          return throwError(error);
        }),
      );
  }
}
