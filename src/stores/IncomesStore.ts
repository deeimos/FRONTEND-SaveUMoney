import { makeObservable, observable, action, runInAction } from 'mobx';
import { IActions, IActionDtString, IBaseActionDtString, IGetActions } from '../const/types';
import { IncomesClient } from '../server';

export class IncomeStore {
  isLoading: boolean;
  incomes: IActions[];
  countIncomes: number;
  errorMsg: string;

  constructor() {
    this.incomes = [];
    this.countIncomes = 0;
    this.isLoading = false;
    this.errorMsg = '';

    makeObservable(this, {
      incomes: observable,
      isLoading: observable,
      GetIncomesAction: action,
      AddIncomeAction: action,
      UpdateIncomeAction: action,
      DelIncomeAction: action,
    });
  }

  GetIncomesAction = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await IncomesClient.getIncomes(date);
      if (result && result?.data) {
        runInAction(() => {
          this.incomes = result.data;
          this.countIncomes = result.data.length;
          this.isLoading = false;
        })
      }
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  AddIncomeAction = action(async (income: IBaseActionDtString, date: IGetActions) => {
    try {
      await IncomesClient.addIncome(income);
      await this.GetIncomesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  UpdateIncomeAction = action(async (income: IActionDtString, date: IGetActions) => {
    try {
      await IncomesClient.updateIncome(income);
      await this.GetIncomesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  DelIncomeAction = action(async (income: IActionDtString, date: IGetActions) => {

    try {
      await IncomesClient.deleteIncome(income._id);
      await this.GetIncomesAction(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })
}
