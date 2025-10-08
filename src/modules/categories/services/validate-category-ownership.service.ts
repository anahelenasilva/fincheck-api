import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) { }

  async validate(userId: string, categoryId: string) {
    const category = await this.categoriesRepo.findFirst(userId, categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
