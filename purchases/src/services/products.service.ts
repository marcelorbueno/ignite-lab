import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductsById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const productWithSameTitle = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameTitle) {
      throw new Error(`Product with title ${title} already exists`);
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
