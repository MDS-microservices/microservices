/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { configure, util } from 'protobufjs';
import { Observable } from 'rxjs';
import Long from 'long';

export const protobufPackage: string = 'products';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Create
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  product: Product;
}

// Update
export interface UpdateProductRequest {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface UpdateProductResponse {
  status: number;
  error: string[];
  product: Product;
}

// FindAll
export interface FindAllResponse {
  status: number;
  error: string[];
  products: Product[];
}

// Remove
export interface RemoveProductRequest {
  id: number;
}

export interface RemoveProductResponse {
  status: number;
  error: string[];
}

export const PRODUCTS_PACKAGE_NAME: string = 'product';

export interface ProductsServiceClient {
  create(request: CreateProductRequest): Observable<CreateProductResponse>;

  update(request: UpdateProductRequest): Observable<UpdateProductResponse>;

  findAll(): Observable<FindAllResponse>;

  remove(request: RemoveProductRequest): Observable<RemoveProductResponse>;
}

export interface ProductsServiceController {
  create(
    request: CreateProductRequest,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  update(
    request: UpdateProductRequest,
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse;

  findAll():
    | Promise<FindAllResponse>
    | Observable<FindAllResponse>
    | FindAllResponse;

  remove(
    request: RemoveProductRequest,
  ):
    | Promise<RemoveProductResponse>
    | Observable<RemoveProductResponse>
    | RemoveProductResponse;
}

export function ProductsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'update', 'findAll', 'remove'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCTS_SERVICE_NAME: string = 'ProductService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
