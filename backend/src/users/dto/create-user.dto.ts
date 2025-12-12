import { UserRoles } from "../../entities/user.entity";

export class CreateUserDto {
  fullname: string;
  email: string;
  password: string;
  role?: UserRoles;
}
