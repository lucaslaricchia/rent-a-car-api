import { Category } from "../model/category";

interface ICraeteCategoryDTO {
  name: string;
  description: string;
}


interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICraeteCategoryDTO): void;
}

export { ICategoriesRepository, ICraeteCategoryDTO };