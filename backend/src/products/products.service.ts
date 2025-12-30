/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { GetProductsQueryDto } from "./dto/get-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["medias", "categories", "reviews", "categories.category"],
    });

    if (!product) throw new Error("Product not found");

    return product;
  }

  async searchProductsByName(name: string, page = 1, limit = 10) {
    const [items, total] = await this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.medias", "media")
      .leftJoin("product.categories", "pc")
      .leftJoin("pc.category", "category")
      .where("product.name ILIKE :name", { name: `%${name}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProducts(query: GetProductsQueryDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = "newest",
      categoryId,
      minPrice,
      maxPrice,
      inStock,
    } = query;

    const qb = this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.medias", "media")
      .leftJoinAndSelect("product.reviews", "review")
      .leftJoinAndSelect("product.categories", "pc")
      .leftJoinAndSelect("pc.category", "category");

    if (categoryId) {
      qb.andWhere("category.id = :categoryId", { categoryId });
    }
    if (minPrice !== undefined) {
      qb.andWhere("product.price >= :minPrice", { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere("product.price <= :maxPrice", { maxPrice });
    }
    if (inStock) {
      qb.andWhere("product.quantity > 0");
    }

    let orderField = "product.createdAt";
    let orderDirection: "ASC" | "DESC" = "DESC";

    switch (sortBy) {
      case "oldest":
        orderDirection = "ASC";
        break;
      case "cheapest":
        orderField = "product.price";
        orderDirection = "ASC";
        break;
      case "mostExpensive":
        orderField = "product.price";
        orderDirection = "DESC";
        break;
      default:
        orderField = "product.createdAt";
        orderDirection = "DESC";
        break;
    }
    qb.orderBy(orderField, orderDirection);

    qb.skip((page - 1) * limit).take(limit);

    const items = await qb.getMany();

    const countQb = this.productRepo.createQueryBuilder("product");
    if (categoryId) {
      countQb
        .innerJoin("product.categories", "pc")
        .innerJoin("pc.category", "category")
        .andWhere("category.id = :categoryId", { categoryId });
    }
    if (minPrice !== undefined) {
      countQb.andWhere("product.price >= :minPrice", { minPrice });
    }
    if (maxPrice !== undefined) {
      countQb.andWhere("product.price <= :maxPrice", { maxPrice });
    }
    if (inStock) {
      countQb.andWhere("product.quantity > 0");
    }

    const total = await countQb.getCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async uploadToCloudinary(
    file: any,
    folder = "shoppy-products"
  ): Promise<{ url: string; resourceType: string }> {
    const cloudinary = this.cloudinaryService.getInstance();
    const stream = file.createReadStream();

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            return reject(
              error instanceof Error
                ? error
                : new Error(String(error?.message || error))
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
  }

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
        category,
      });
      await manager.save(pc);

      if (input.media?.files?.length) {
        const mediaRepo = manager.getRepository(ProductMedia);

        for (let i = 0; i < input.media.files.length; i++) {
          const file = await input.media.files[i];
          const uploadResult = await this.uploadToCloudinary(file);

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
          category = manager.create(Category, {
            name: input.category.name,
          });
          category = await manager.save(category);
        }

        await manager.delete(ProductCategory, {
          product: { id: updatedProduct.id },
        });

        const pc = manager.create(ProductCategory, {
          product: updatedProduct,
          category,
        });
        await manager.save(pc);
      }

      if (input.media?.files?.length) {
        const mediaRepo = manager.getRepository(ProductMedia);

        if (product.medias.length) {
          await mediaRepo.delete(product.medias.map((m) => m.id));
        }

        for (let i = 0; i < input.media.files.length; i++) {
          const file = await input.media.files[i];
          const uploadResult = await this.uploadToCloudinary(file);

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
