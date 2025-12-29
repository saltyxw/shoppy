import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";
import { ProductMedia } from "src/entities/product-media.entity";
import { CloudinaryService } from "src/configs/cloudinary.config";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductCategory } from "src/entities/product-category.entity";

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

  async create(input: CreateProductDto): Promise<Product> {
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
      });

      const savedProduct = await manager.save(product);

      const pc = manager.create(ProductCategory, {
        product: savedProduct,
        category: category,
      });
      await manager.save(pc);

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
              { folder: "shoppy-products", resource_type: "auto" },
              (error, result) => {
                if (error || !result) return reject(error);
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

  async updateProduct(id: number, input: UpdateProductDto): Promise<Product> {
    return this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(Product, {
        where: { id },
        relations: ["medias", "categories"],
      });

      if (!product) throw new Error("Product not found");

      if (input.name) product.name = input.name;
      if (input.description) product.description = input.description;
      if (input.price !== undefined) product.price = input.price;
      if (input.quantity !== undefined) product.quantity = input.quantity;

      const updatedProduct = await manager.save(product);

      if (input.category?.name) {
        let category = await manager.findOne(Category, {
          where: { name: input.category.name },
        });
        if (!category) {
          category = manager.create(Category, { name: input.category.name });
          category = await manager.save(category);
        }

        await manager.delete(ProductCategory, {
          product: { id: updatedProduct.id },
        });

        const pc = manager.create(ProductCategory, {
          product: updatedProduct,
          category: category,
        });
        await manager.save(pc);
      }

      if (input.media?.files?.length) {
        const mediaRepo = manager.getRepository(ProductMedia);

        if (product.medias.length) {
          const oldMediaIds = product.medias.map((m) => m.id);
          await mediaRepo.delete(oldMediaIds);
        }

        const cloudinary = this.cloudinaryService.getInstance();

        for (let i = 0; i < input.media.files.length; i++) {
          const file = await input.media.files[i];
          const stream = file.createReadStream();

          const uploadResult = await new Promise<{
            url: string;
            resourceType: string;
          }>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              { folder: "shoppy-products", resource_type: "auto" },
              (error, result) => {
                if (error || !result) return reject(error);
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
          media.product = updatedProduct;

          await mediaRepo.save(media);
        }
      }

      return updatedProduct;
    });
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
