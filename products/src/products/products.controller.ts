import { Controller, Inject } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductResponse,
  FindAllResponse,
  PRODUCTS_SERVICE_NAME,
  RemoveProductResponse,
  UpdateProductResponse,
} from './product.pb';
import { ProductDto } from './product.dto';

@Controller()
export class ProductsController {
  @Inject(ProductsService)
  private readonly service: ProductsService;

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'Create')
  private create(payload: ProductDto): Promise<CreateProductResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'Update')
  private update(payload: ProductDto): Promise<UpdateProductResponse> {
    return this.service.update(payload);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'FindAll')
  private findAll(): Promise<FindAllResponse> {
    return this.service.findAll();
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'Remove')
  private remove(payload: { id: number }): Promise<RemoveProductResponse> {
    return this.service.remove(payload.id);
  }
}
