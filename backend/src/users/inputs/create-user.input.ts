import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, MinLength, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Password should contain at leats 6 symbols" })
  @Field()
  password: string;
}
