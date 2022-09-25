import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";
class ImportCategoryController {

  handle(request: Request, response: Response): Response {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };