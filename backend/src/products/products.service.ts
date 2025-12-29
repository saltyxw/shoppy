import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";
import { ProductMedia } from "src/entities/product-media.entity";
import { CreateProductInput } from "./inputs/create-product.input";
import { CloudinaryService } from "src/configs/cloudinary.config";

@Injectable()
export class ProductsService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(ProductMedia)
    private readonly mediaRepo: Repository<ProductMedia>,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    return this.dataSource.transaction(async (manager) => {
      let category = await manager.findOne(Category, {
        where: { name: input.category.name },
      });

      if (!category) {
        category = manager.create(Category, {
          name: input.category.name,
        });
        category = await manager.save(category);
      }

      const product = manager.create(Product, {
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        category,
      });

      const savedProduct = await manager.save(product);

      if (input.media?.files?.length) {
        const mediaRepo = manager.getRepository(ProductMedia);
        const cloudinary = this.cloudinaryService.getInstance();

        for (let i = 0; i < input.media.files.length; i++) {
          const file = await input.media.files[i];
          const stream = file.createReadStream();

          const uploadResult = await new Promise<{
            url: string;
            resourceType: string;
          }>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              {
                folder: "shoppy-products",
                resource_type: "auto",
              },
              (error, result) => {
                if (error || !result) {
                  return reject(
                    new Error(error?.message || "Cloudinary upload error")
                  );
                }

                resolve({
                  url: result.secure_url,
                  resourceType: result.resource_type,
                });
              }
            );

            stream.pipe(upload);
          });

          const media = new ProductMedia();
          media.imageUrl = uploadResult.url;
          media.videoUrl =
            uploadResult.resourceType === "video"
              ? uploadResult.url
              : undefined;

          media.orderPosition = input.media.orderPosition ?? i;
          media.product = savedProduct;
          media.productId = savedProduct.id;

          await mediaRepo.save(media);
        }
      }

      return savedProduct;
    });
  }
}
