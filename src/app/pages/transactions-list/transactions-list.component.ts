import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { TransactionDtoResponse } from '../../core/dtos/responses/transaction-dto.response';
import { ToastrService } from 'ngx-toastr';
import { expenseTypeTranslation, expenseTypeGetDescription } from '../../core/enums/expense-type.enum';
import { TransactionDtoRequest } from '../../core/dtos/requests/transaction-dto.request';
import { UUID } from 'node:crypto';
import { EditTransactionModalComponent } from '../components/edit-transaction-modal/edit-transaction-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {

  transactions: TransactionDtoResponse[] = []

  expenseTypeGetDescription = expenseTypeGetDescription;

  constructor(private transactionService: TransactionsService, private toastr: ToastrService, private dialog: MatDialog) {}

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

  editTransaction(transaction: TransactionDtoResponse) {
    const dialogRef = this.dialog.open(EditTransactionModalComponent, {
      width: '600px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getTransactions(); // Atualiza a lista de transações
        this.toastr.success('Transação atualizada com sucesso!', 'Sucesso');
      }
    });
  }

  updateTransaction(request: TransactionDtoRequest, transactionId: UUID): void {
    this.transactionService.updateTransaction(request, transactionId).subscribe(
      updatedTransaction => {
        this.toastr.success('Transação atualizada com sucesso!', 'Sucesso');
        this.getTransactions(); // Atualiza a lista de transações
      },
      error => {
        console.error('Erro ao atualizar transação:', error);
        this.toastr.error('Erro ao atualizar transação!', 'Erro');
      }
    );
  }

  deleteTransaction(transactionId: UUID) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(
        () => {
          this.toastr.success('Transação excluída com sucesso!', 'Sucesso');
          this.getTransactions(); // Atualiza a lista de transações
        },
        (error) => {
          console.error('Erro ao excluir transação:', error);
          this.toastr.error('Erro ao excluir transação!', 'Erro');
        }
      );
    }
  }


}
