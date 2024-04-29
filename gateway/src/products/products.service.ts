import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTS_SERVICE_NAME, ProductsServiceClient } from './product.pb';

@Injectable()
export class ProductsService {
  private svc: ProductsServiceClient;

  @Inject(PRODUCTS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }
}
