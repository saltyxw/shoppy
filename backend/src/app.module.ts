import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import type { Request, Response } from "express";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { ProductMediaModule } from "./product-media/product-media.module";
import { CategoryModule } from "./category/category.module";
import { ProductCategoryModule } from "./product-category/product-category.module";
import { OrderModule } from "./order/order.module";
import { OrderItemModule } from "./order-item/order-item.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,

    ProductsModule,

    ProductMediaModule,

    CategoryModule,

    ProductCategoryModule,

    OrderModule,

    OrderItemModule,

    ReviewsModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
