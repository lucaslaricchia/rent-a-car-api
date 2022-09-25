import { Category } from "../entities/Category";

interface ICraeteCategoryDTO {
  name: string;
  description: string;
}


interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICraeteCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICraeteCategoryDTO };