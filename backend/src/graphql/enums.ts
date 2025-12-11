import { registerEnumType } from "@nestjs/graphql";

export enum UserRoles {
  ADMIN = "ADMIN",
  BUYER = "BUYER",
}

registerEnumType(UserRoles, {
  name: "UserRoles",
  description: "Role of the user",
});
