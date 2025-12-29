import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserPayload } from "../types/user.payload";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserPayload | undefined => {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext<{ req: { user?: UserPayload } }>();

    return req.user;
  }
);
