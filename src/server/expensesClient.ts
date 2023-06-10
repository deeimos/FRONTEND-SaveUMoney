import api from './axiosClient';

import { IActionDtString, IBaseActionDtString, IGetActions } from '../const/types';

export class ExpensesClient {
  static async addExpense(expense: IBaseActionDtString) {
    const result = await api.post('/expenses/create', expense);
    return result;
  }

  static async getExpenses(date: IGetActions) {
    const result = await api.post('/expenses', date);
    return result;
  }

  static async updateExpense(expense: IActionDtString) {
    const result = await api.patch('/expenses/' + expense._id, expense);
    return result;
  }

  static async deleteExpense(id: string) {
    const result = await api.delete('/expenses/' + id);
    return result;
  }

  static async totalExpenses(date: IGetActions){
    const result = await api.post('/expenses/total', date);
    return result;
  }

  static async statsExpenses(date: IGetActions){
    const result = await api.post('/expenses/stats', date);
    return result;
  }
}

export default ExpensesClient;