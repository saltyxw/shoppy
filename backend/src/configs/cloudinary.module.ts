import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CloudinaryService } from "./cloudinary.config";

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
