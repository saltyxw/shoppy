import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
