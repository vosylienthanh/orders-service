import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { IApiKeyAuthConfig } from './interfaces/api-key-auth-config.interface';

/**
 * In fact, we need to use token here (using passport)
 * We can also use 3rd party for auth such as: keycloak, google firebase but it's out of scope for this test
 */
@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private static _header: string;
  private static _apiKey: string;

  static config(config: IApiKeyAuthConfig) {
    this._header = config.header;
    this._apiKey = config.apiKey;
  }

  use(req: Request, res: Response, next: () => void) {
    if (ApiKeyMiddleware._apiKey !== req.headers[ApiKeyMiddleware._header]) {
      throw new UnauthorizedException();
    }

    next();
  }
}
