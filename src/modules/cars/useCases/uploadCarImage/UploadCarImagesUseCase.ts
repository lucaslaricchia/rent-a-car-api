import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {

  constructor(
    private carsRepository: ICarsRepository,
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase }