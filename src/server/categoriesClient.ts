import api from './axiosClient';

export class CategoriesClient {
  static async getExpensesCategories() {
    const result = await api.get('/expense-categories');
    return result;
  }

  static async getIncomesCategories() {
    const result = await api.get('/income-categories');
    return result;
  }
}

export default CategoriesClient;