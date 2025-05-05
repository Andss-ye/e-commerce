import { Product } from './product.model.js';
import { ProductRepository } from './product.repository.js';

export class ProductService {
    constructor(private productRepo: ProductRepository) {}

    async createProduct(product: Product) {
        return this.productRepo.create(product);
    }
}