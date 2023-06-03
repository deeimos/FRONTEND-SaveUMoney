import api from './axiosClient';

import { IAddBill, IBill } from '../const/types';

export class BillsClient {
  static async addBill(bill: IAddBill) {
    const result = await api.post('/bills', bill);
    return result;
  }

  static async getBills() {
    const result = await api.get('/bills');
    return result;
  }

  static async updateBill(id: string, bill: IBill) {
    const result = await api.patch('/bills/' + id, bill)
    return result
  }

  static async deleteBill(id: string) {
    const result = await api.patch('/bills/' + id)
    return result
  }
}

export default BillsClient;