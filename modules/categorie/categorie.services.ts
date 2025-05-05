import { Categorie } from './categorie.model.js';
import { CategorieRepository } from './categorie.repository.js';

export class CategorieService {
    constructor(private categorieRepo: CategorieRepository) {}

    async createCategorie(categorie: Categorie) {
        return this.categorieRepo.create(categorie);
    }
}