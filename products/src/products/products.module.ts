import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
