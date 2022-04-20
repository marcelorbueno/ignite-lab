import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customerWithSameAuthUserId = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (customerWithSameAuthUserId) {
      throw new Error('Customer already exists');
    }

    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
