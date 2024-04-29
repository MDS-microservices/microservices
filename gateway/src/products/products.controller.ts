import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import {
  CreateProductRequest,
  CreateProductResponse,
  FindAllResponse,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
  RemoveProductRequest,
  RemoveProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from './product.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductsController implements OnModuleInit {
  private svc: ProductsServiceClient;

  @Inject(PRODUCTS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  @Post('create')
  private async create(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<CreateProductResponse>> {
    return this.svc.create(body);
  }

  @Post('update')
  private async update(
    @Body() body: UpdateProductRequest,
  ): Promise<Observable<UpdateProductResponse>> {
    return this.svc.update(body);
  }

  @Get('findAll')
  private async findAll(): Promise<Observable<FindAllResponse>> {
    return this.svc.findAll();
  }

  @Delete('remove')
  private async remove(
    @Body() body: RemoveProductRequest,
  ): Promise<Observable<RemoveProductResponse>> {
    return this.svc.remove(body);
  }
}
