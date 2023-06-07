import { makeObservable, observable, action, runInAction } from 'mobx';
import { IAction, IBaseAction, IGetActions } from '../const/types';
import { ExpensesClient } from '../server';

export class ExpensesStore {
  isLoading: boolean;
  expenses: IAction[];
  countExpenses: number;
  errorMsg: string;

  constructor() {
    this.expenses = [];
    this.countExpenses = 0;
    this.isLoading = false;
    this.errorMsg = '';

    makeObservable(this, {
      expenses: observable,
      isLoading: observable,
      GetExpensesAction: action,
      AddExpenseAction: action,
      UpdateExpenseAction: action,
      DelExpenseAction: action,
    });
  }

  GetExpensesAction = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await ExpensesClient.getExpenses(date);

      runInAction(() => {
        this.expenses = result.data;
        this.countExpenses = result.data.length;
        this.isLoading = false;
      })
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  AddExpenseAction = action(async (expense: IBaseAction, date: IGetActions) => {
    try {
      await ExpensesClient.addExpense(expense);
      await this.GetExpensesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  UpdateExpenseAction = action(async (expense: IAction, date: IGetActions) => {
    try {
      await ExpensesClient.updateExpense(expense);
      await this.GetExpensesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  DelExpenseAction = action(async (expense: IAction, date: IGetActions) => {

    try {
      await ExpensesClient.deleteExpense(expense._id);
      await this.GetExpensesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })
}
