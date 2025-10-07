import { Injectable } from '@nestjs/common';
import { type Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  //to-do: remove prisma type and create a custom type for the dto
  async findAll(dto: Prisma.CategoryFindManyArgs) {
    const categories = await this.prismaService.category.findMany(dto);
    return categories;
  }
}
