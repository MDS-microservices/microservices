import { Global, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_PACKAGE_NAME, PRODUCTS_SERVICE_NAME } from './product.pb';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'microservices-products:50052',
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/product.proto',
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
