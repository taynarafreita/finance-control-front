import { ExpenseTypeEnum } from "../../enums/expense-type.enum";
import { CategoryDtoRequest } from "./category-dto.request";
import { UserDtoRequest } from "./user-dto.request";

export interface TransactionDtoRequest {
  user: UserDtoRequest;
  transactionDescription: string;
  category: CategoryDtoRequest;
  expenseType: ExpenseTypeEnum;
  dueDate?: Date;
  amount: number;
  comments?: string;
}
