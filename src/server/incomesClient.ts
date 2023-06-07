import api from './axiosClient';

import { IActionDtString, IBaseActionDtString, IGetActions } from '../const/types';

export class IncomesClient {
  static async addIncome(income: IBaseActionDtString) {
    const result = await api.post('/incomes/create', income);
    return result;
  }

  static async getIncomes(date: IGetActions) {
    const result = await api.post('/incomes', date);
    return result;
  }

  static async updateIncome(income: IActionDtString) {
    const result = await api.patch('/incomes/' + income._id, income);
    return result;
  }

  static async deleteIncome(id: string) {
    const result = await api.delete('/incomes/' + id);
    return result;
  }
}

export default IncomesClient;