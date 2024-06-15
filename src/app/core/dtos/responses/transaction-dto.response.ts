import { UUID } from "crypto";
import { ExpenseTypeEnum } from "../../enums/expense-type.enum";
import { UserDtoResponse } from "./user-dto.response";
import { CategoryDtoResponse } from "./category-dto.response";

export interface TransactionDtoResponse {
  id: UUID;
  user?: UserDtoResponse;
  transactionDescription: string;
  category: CategoryDtoResponse;
  expenseType: ExpenseTypeEnum;
  dueDate?: Date;
  amount: number;
  comments?: string;
  createdAt: Date;
  updatedAt?: Date;
}
