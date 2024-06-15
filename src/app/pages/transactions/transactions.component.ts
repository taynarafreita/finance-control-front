import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { CategoryDtoResponse } from '../../core/dtos/responses/category-dto.response';
import { CategoriesService } from '../../services/categories/categories.service';
import { expenseTypeTranslation } from '../../core/enums/expense-type.enum';
import { ToastrService } from 'ngx-toastr';
import { TransactionDtoRequest } from '../../core/dtos/requests/transaction-dto.request';
import { TransactionDtoResponse } from '../../core/dtos/responses/transaction-dto.response';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactionData?: TransactionDtoResponse;
  @Output() transactionSaved = new EventEmitter<void>();

  transactionsForm!: FormGroup;
  categories: CategoryDtoResponse[] = [];

  expenseTypes = expenseTypeTranslation;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionsService,
    private categoryService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    if (this.transactionData) {
      this.populateForm(this.transactionData);
    }
  }

  buildForm() {
    this.transactionsForm = this.formBuilder.group({
      transactionDescription: ['', [Validators.required]],
      category: ['', [Validators.required]],
      expenseType: ['', Validators.required],
      amount: ['', [Validators.required]],
      comments: [''],
    });
  }

  populateForm(transaction: TransactionDtoResponse) {
    this.transactionsForm.patchValue({
      transactionDescription: transaction.transactionDescription,
      category: transaction.category?.id,
      expenseType: transaction.expenseType,
      amount: transaction.amount,
      comments: transaction.comments,
    });
  }

  saveTransaction(): void {
    if (this.transactionsForm.valid) {
      const transactionData: TransactionDtoRequest = {
        user: {
          id: this.transactionData?.user?.id || 'c34b67b4-e5be-4c95-95cc-4180d2eb10b3',
        },
        transactionDescription: this.transactionsForm.get('transactionDescription')?.value,
        category: {
          id: this.transactionsForm.get('category')?.value,
        },
        expenseType: this.transactionsForm.get('expenseType')?.value,
        amount: this.transactionsForm.get('amount')?.value,
        comments: this.transactionsForm.get('comments')?.value,
      };

      if (this.transactionData?.id) {
        this.transactionService.updateTransaction(transactionData, this.transactionData.id).subscribe(
          (response) => {
            this.toastr.success('Transação atualizada com sucesso!', 'Sucesso');
            this.transactionSaved.emit();
          },
          (error) => {
            console.error('Erro ao atualizar transação: ', error);
            this.toastr.error('Erro ao atualizar transação!', 'Erro');
          }
        );
      } else {
        this.transactionService.createTransaction(transactionData).subscribe(
          (response) => {
            this.toastr.success('Transação criada com sucesso!', 'Sucesso');
            this.transactionSaved.emit();
            this.transactionsForm.reset();
          },
          (error) => {
            console.error('Erro ao criar transação: ', error);
            this.toastr.error('Erro ao criar transação!', 'Erro');
          }
        );
      }
    } else {
      if (this.transactionsForm.invalid) {
        this.toastr.warning('Preencha todos os campos obrigatórios');
      }
    }
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: CategoryDtoResponse[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.toastr.error('Erro ao carregar categorias!', 'Erro');
      }
    );
  }
}
