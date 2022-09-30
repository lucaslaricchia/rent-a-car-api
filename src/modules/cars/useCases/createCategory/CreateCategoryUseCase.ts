import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new AppError("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };