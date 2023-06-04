import { makeObservable, observable, action, runInAction } from 'mobx';

import React from 'react';
import { IAddBill, IBill } from '../const/types';
import { BillsClient } from '../server';

export class BillStore {
  isLoading: boolean;
  bills: IBill[];
  countBill: number;
  errorMsg: string;

  constructor() {
    this.bills = [];
    this.countBill = 0;
    this.isLoading = false;
    this.errorMsg = '';

    makeObservable(this, {
      bills: observable,
      isLoading: observable,
      GetBillsAction: action,
      AddBillAction: action,
      UpdateBillAction: action,
      DelBillAction: action,
    });
  }

  GetBillsAction = action(async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await BillsClient.getBills();
      
      runInAction(() => {
        this.bills = result.data;
        this.countBill = result.data.length;
        this.isLoading = false;
      })
    } catch(error: any){
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  AddBillAction = action(async (bill: IAddBill) => {
    try {
      await BillsClient.addBill(bill);
      await this.GetBillsAction();
    } catch(error: any){
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  UpdateBillAction = action(async (bill: IBill) => {
    try {
        await BillsClient.updateBill(bill);
        await this.GetBillsAction();
    } catch(error: any){
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message  || '';
      })
    }
  })

  DelBillAction = action(async (bill: IBill) => {

    try {
      await BillsClient.deleteBill(bill._id);
      await this.GetBillsAction();
    } catch(error: any){
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
 })
}
