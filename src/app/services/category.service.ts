import { HttpClient, } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ICategory } from "../types/category.interface";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoriesSig = signal<ICategory[]>([])


    constructor(
        private readonly htpp: HttpClient,
        private readonly toastr: ToastrService
    ) { }

    findAll() {
        return this.htpp.get<ICategory[]>('categories').subscribe((categories: ICategory[]) => {
            this.categoriesSig.set(categories)
        })
    }

    create(title: string) {
        return this.htpp.post<ICategory>('categories', { title }).subscribe((newCategory: ICategory) => {
            this.categoriesSig.update((categories) => [...categories, newCategory])
            this.toastr.success('created')
        })
    }

    delete(id: number) {
        return this.htpp.delete(`categories/category/${id}`).subscribe(() => {
            this.categoriesSig.update((categories) =>
                categories.filter((category) => category.id !== id)

            ),
                this.toastr.warning('You delete this category')
        })
    }

    update(id: number, title: string) {
        this.htpp.patch(`categories/category/${id}`, { title }).subscribe(() => {
            this.categoriesSig.update((categories) =>
                categories.map((ctg) => ctg.id === id ? { ...ctg, title } : ctg)
            )

            this.toastr.success('Updated')
        })
    }
}
