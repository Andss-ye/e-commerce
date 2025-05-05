import { PaymentMethod } from './paymentMethod.model';
import { PaymentMethodRepository } from './paymentMethod.repository';

export class PaymentMethodService {
    constructor(private paymentMethodRepo: PaymentMethodRepository) {}

    async createPaymentMethod(paymentMethod: PaymentMethod) {
        return this.paymentMethodRepo.create(paymentMethod);
    }
}