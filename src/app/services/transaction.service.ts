import { Injectable, signal } from "@angular/core";
import { ITransaction, ITransactionData } from "../types/transaction.interface";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "./category.service";
import { tap } from "rxjs";
import { ICategory } from "../types/category.interface";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    transactionSig = signal<ITransaction[]>([])

    constructor(
        private readonly http: HttpClient,
        private readonly toastr: ToastrService,
        private categoryService: CategoryService
    ) { }

    findAll() {
        return this.http.get<ITransaction[]>('transaction').subscribe((res) => this.transactionSig.set(res))
    }

    create(data: ITransactionData) {
        return this.http.post<ITransaction>('transaction', data)
            .pipe(
                tap((newTransaction) => {
                    const category = this.categoryService.categoriesSig()
                        .find(ctg => ctg.id === newTransaction.category?.id) as ICategory;

                    this.transactionSig.update((transaction) => [
                        { ...newTransaction, category },
                        ...transaction,
                    ])
                })
            )
            .subscribe(() => this.toastr.success('Created'))
    }

    delete(id: number) {
        this.http.delete(`transaction/transaction/${id}`).subscribe((transaction) => {
            this.transactionSig.update((transaction) => transaction.filter((transaction) => transaction.id !== id))

            this.toastr.warning('Deleted')
        })

    }
}