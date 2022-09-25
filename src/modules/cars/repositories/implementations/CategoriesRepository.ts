import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICraeteCategoryDTO } from "../ICategoriesRepository";
import {Repository} from 'typeorm';
import { dataSource } from "../../../../database";
class CategoriesRepository
  implements ICategoriesRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICraeteCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };