import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryDtoRequest } from '../../core/dtos/requests/category-dto.request';
import { Observable } from 'rxjs';
import { CategoryDtoResponse } from '../../core/dtos/responses/category-dto.response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<CategoryDtoResponse[]> {
    return this.httpClient.get<CategoryDtoResponse[]>(`${this.API_URL}/categories`);
  }
}
