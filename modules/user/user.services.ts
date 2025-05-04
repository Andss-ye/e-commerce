import { User } from "./user.model.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async createUser(user: User) {
        return this.userRepo.create(user);
    }
}