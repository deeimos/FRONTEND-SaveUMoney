import api from './axiosClient';

import { IAction, IBaseAction, IGetActions } from '../const/types';

export class ExpensesClient {
  static async addExpense(expense: IBaseAction) {
    const result = await api.post('/expenses/create', expense);
    return result;
  }

  static async getExpenses(date: IGetActions) {
    const result = await api.post('/expenses', date);
    return result;
  }

  static async updateExpense(expense: IAction) {
    const result = await api.patch('/expenses/' + expense._id, expense);
    return result;
  }

  static async deleteExpense(id: string) {
    const result = await api.delete('/expenses/' + id);
    return result;
  }
}

export default ExpensesClient;