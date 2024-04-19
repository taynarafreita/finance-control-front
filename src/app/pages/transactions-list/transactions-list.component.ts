import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { TransactionDtoResponse } from '../../core/dtos/responses/transaction-dto.response';
import { ToastrService } from 'ngx-toastr';
import { expenseTypeTranslation, expenseTypeGetDescription } from '../../core/enums/expense-type.enum';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {

  transactions: TransactionDtoResponse[] = []

  expenseTypeGetDescription = expenseTypeGetDescription;

  constructor(private transactionService: TransactionsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(
      transactions => {
        this.transactions = transactions
      },
      (error) => {
        console.error('Erro ao carregar transações:', error);
        this.toastr.error('Erro ao carregar transações!', 'Erro');
      }
    )
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
