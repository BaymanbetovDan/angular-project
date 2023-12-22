import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-forms',
  templateUrl: './transactions-forms.component.html',
  styleUrls: ['./transactions-forms.component.css']
})
export class TransactionsFormsComponent {
  transactionForm: FormGroup

  constructor(
    public transactionService: TransactionService,
    public categoryService: CategoryService
    ) {
    this.transactionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.create(this.transactionForm.value)
      this.transactionForm.reset()
    }
  }
}
