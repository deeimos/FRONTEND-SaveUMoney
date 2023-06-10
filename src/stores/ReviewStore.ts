import { makeObservable, observable, action, runInAction } from 'mobx';
import { IGetActions, IActionsTotal, IActionTotal } from '../const/types';
import { IncomesClient, ExpensesClient } from '../server';


export class ReviewStore {
  isLoading: boolean;
  totalIncomes: IActionsTotal | null;
  totalExpenses: IActionsTotal | null;
  statsIncomes: IActionTotal[];
  statsExpenses: IActionTotal[];
  errorMsg: string;

  constructor() {
    this.isLoading = false;
    this.totalIncomes = null;
    this.totalExpenses = null;
    this.statsIncomes = [];
    this.statsExpenses = [];
    this.errorMsg = '';

    makeObservable(this, {
      isLoading: observable,
      totalIncomes: observable,
      totalExpenses: observable,
      statsIncomes: observable,
      statsExpenses: observable,
      GetTotalIncomes: action,
      GetStatsIncomes: action,
      GetTotalExpenses: action,
      GetStatsExpenses: action,
      GetReviewData: action,
    });
  }

  GetTotalIncomes = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await IncomesClient.totalIncomes(date);

      runInAction(() => {
        this.totalIncomes = result.data;
        this.isLoading = false;
      })
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  GetStatsIncomes = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await IncomesClient.statsIncomes(date);

      runInAction(() => {
        this.statsIncomes = result.data;
        this.isLoading = false;
      })
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  GetTotalExpenses = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await ExpensesClient.totalExpenses(date);

      runInAction(() => {
        this.totalExpenses = result.data;
        this.isLoading = false;
      })
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  GetStatsExpenses = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await ExpensesClient.statsExpenses(date);

      runInAction(() => {
        this.statsExpenses = result.data;
        this.isLoading = false;
      })
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })

  GetReviewData = action(async (date: IGetActions) => {
    try {
      await this.GetTotalIncomes(date);
      await this.GetStatsIncomes(date);
      await this.GetTotalExpenses(date);
      await this.GetStatsExpenses(date);
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response.data.message || '';
      })
    }
  })
}
