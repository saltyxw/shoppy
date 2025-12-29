import { UserRoles } from "src/entities/user.entity";

export type UserPayload = {
  sub: number;
  username: string;
  role: UserRoles;
};
