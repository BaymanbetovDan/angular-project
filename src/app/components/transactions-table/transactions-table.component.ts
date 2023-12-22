import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {
  trashIcon = faTrash
  currentPage = 1

  constructor(
    readonly transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionService.findAll()
  }

  delete(id: number) {
    this.transactionService.delete(id)
  }
}
