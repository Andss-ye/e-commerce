import { Maker } from "./maker.model.js";
import { MakerRepository } from "./maker.repository.js";

export class MakerService {
    constructor(private makerRepo: MakerRepository) {}

    async createMaker(maker: Maker) {
        return this.makerRepo.create(maker);
    }
}