import { Sale } from "./sale.model";
import { SaleRepository } from "./sale.repository.js";

export class SaleService {
    constructor(private saleRepo: SaleRepository) {}

    async createSale(sale: Sale) {
        return this.saleRepo.create(sale);
    }
}