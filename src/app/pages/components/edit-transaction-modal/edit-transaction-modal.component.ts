import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionDtoResponse } from '../../../core/dtos/responses/transaction-dto.response';
import { ExpenseTypeEnum } from '../../../core/enums/expense-type.enum';

@Component({
  selector: 'app-edit-transaction-modal',
  templateUrl: './edit-transaction-modal.component.html',
  styleUrl: './edit-transaction-modal.component.scss'
})
export class EditTransactionModalComponent {

  expenseTypes = Object.values(ExpenseTypeEnum); // Ajuste conforme seu enum de tipos de despesas

  constructor(
    public dialogRef: MatDialogRef<EditTransactionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionDtoResponse
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onTransactionSaved(): void {
    this.dialogRef.close(true);
  }
}
