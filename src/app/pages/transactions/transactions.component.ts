import { TransactionDtoRequest } from '../../core/dtos/requests/transaction-dto.request';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { CategoryDtoResponse } from '../../core/dtos/responses/category-dto.response';
import { CategoriesService } from '../../services/categories/categories.service';
import { ExpenseTypeEnum, expenseTypeGetDescription, expenseTypeTranslation } from '../../core/enums/expense-type.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {

  transactionsForm!: FormGroup
  categories: CategoryDtoResponse[] = []

  expenseTypes = expenseTypeTranslation

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionsService,
    private categoryService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
  }

  buildForm() {
    this.transactionsForm = this.formBuilder.group({
      transactionDescription: ['', [Validators.required]],
      category: ['', [Validators.required]],
      expenseType: ['', Validators.required],
      amount: ['', [Validators.required]],
      comments: ['']
    });
  }

  createTransaction(): void {
    if (this.transactionsForm.valid) {
      const transactionData: TransactionDtoRequest = {
        user: {
          id: 'c34b67b4-e5be-4c95-95cc-4180d2eb10b3'
        },
        transactionDescription: this.transactionsForm.get('transactionDescription')?.value,
        category: {
          id:  this.transactionsForm.get('category')?.value
        },
        expenseType: this.transactionsForm.get('expenseType')?.value,
        amount: this.transactionsForm.get('amount')?.value,
        comments: this.transactionsForm.get('comments')?.value
      };

      this.transactionService.createTransaction(transactionData).subscribe(
        response => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // Isso fará com que a rolagem seja suave
          });
          this.toastr.success('Transação criada com sucesso!', 'Sucesso');
          this.transactionsForm.reset();
        },
        error => {
          console.error('Erro ao criar transação: ', error)
          this.toastr.error('Erro ao criar transação!', 'Erro');
        }
      );
    } else {
      if(this.transactionsForm.invalid) {
        this.toastr.warning('Preencha todos os campos obrigatórios')
      return
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
