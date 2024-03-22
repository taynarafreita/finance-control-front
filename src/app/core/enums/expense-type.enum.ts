export enum ExpenseTypeEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE"
}

export const expenseTypeTranslation = [
  { value: ExpenseTypeEnum.INCOME, label: 'Receita' },
  { value: ExpenseTypeEnum.EXPENSE, label: 'Despesa' },
]

export function expenseTypeGetDescription(expense: ExpenseTypeEnum | string | undefined): string {
  switch(expense) {
    case ExpenseTypeEnum.INCOME:
      return 'Receita';
    case ExpenseTypeEnum.EXPENSE:
      return 'Despesa';
    default:
      return 'Não definido';
  }
}
