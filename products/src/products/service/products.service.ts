import { HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductDto } from '../product.dto';
import {
  CreateProductResponse,
  FindAllResponse,
  RemoveProductResponse,
  UpdateProductResponse,
} from '../product.pb';

@Injectable()
export class ProductsService {
  constructor(private dataSource: DataSource) {}

  repository(): Repository<Product> {
    return this.dataSource.getRepository(Product);
  }

  public async create(dto: ProductDto): Promise<CreateProductResponse> {
    const product = await this.repository().save(dto);

    return { product, status: HttpStatus.CREATED, error: null };
  }

  public async update(dto: ProductDto): Promise<UpdateProductResponse> {
    const find = await this.repository().findOneBy({ id: dto.id });

    if (!find) {
      return {
        product: null,
        status: HttpStatus.NOT_FOUND,
        error: ['Product not found'],
      };
    }

    try {
      await this.repository().update(dto.id, dto);
    } catch (e) {
      return {
        product: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: ['Error updating product'],
      };
    }

    const product = await this.repository().findOneBy({ id: dto.id });

    return { product, status: HttpStatus.OK, error: null };
  }

  public async findAll(): Promise<FindAllResponse> {
    const products = await this.repository().find();

    return { products, status: HttpStatus.OK, error: null };
  }

  public async remove(id: number): Promise<RemoveProductResponse> {
    await this.repository().delete(id);

    return { status: HttpStatus.OK, error: null };
  }
}
