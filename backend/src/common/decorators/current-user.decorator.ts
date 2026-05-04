import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserIdentity } from 'src/modules/auth/domain/interfaces/identity.interface';

interface IRequestWithUser {
  user: IUserIdentity;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserIdentity => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUser>();
    return request.user;
  },
);
