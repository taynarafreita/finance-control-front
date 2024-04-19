import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionDtoRequest } from '../../core/dtos/requests/transaction-dto.request';
import { Observable, map } from 'rxjs';
import { TransactionDtoResponse } from '../../core/dtos/responses/transaction-dto.response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private API_URL = environment.API_URL;
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(private httpClient: HttpClient) { }

  createTransaction(request: TransactionDtoRequest): Observable<TransactionDtoResponse> {
    return this.httpClient.post<TransactionDtoResponse>(`${this.API_URL}/transactions/create`, request, this.httpOptions);
  }

  getTransactions() {
    return this.httpClient.get<TransactionDtoResponse[]>(`${this.API_URL}/transactions`)
  }
}
