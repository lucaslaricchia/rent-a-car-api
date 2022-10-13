import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


describe('List Cars', () => {
  test('should be able to list all available cars', async () => {
    const carsRepositoryInMemory = new CarsRepositoryInMemory();
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  test('should be able to list all available cars by brand', async () => {
    const carsRepositoryInMemory = new CarsRepositoryInMemory();
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });

  test('should be able to list all available cars by name', async () => {
    const carsRepositoryInMemory = new CarsRepositoryInMemory();
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car]);
  });

  test('should be able to list all available cars by category', async () => {
    const carsRepositoryInMemory = new CarsRepositoryInMemory();
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    const car = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
