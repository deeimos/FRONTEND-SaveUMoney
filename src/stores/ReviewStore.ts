import { makeObservable, observable, action, runInAction } from 'mobx';
import { IGetActions, IActionsTotal, IActionStats } from '../const/types';
import { IncomesClient, ExpensesClient } from '../server';


export class ReviewStore {
  isLoading: boolean;
  totalIncomes: IActionsTotal | null;
  totalExpenses: IActionsTotal | null;
  statsIncomes: IActionStats[];
  statsExpenses: IActionStats[];
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
      GetTotals: action,
      GetStatsIncomes: action,
      GetStatsExpenses: action,
      GetReviewData: action,
    });
  }

  GetTotals = action(async (date: IGetActions) => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      });

      const totalIncomesPromise = IncomesClient.totalIncomes(date);
      const totalExpensesPromise = ExpensesClient.totalExpenses(date);

      const [
        totalIncomesResult,
        totalExpensesResult,
      ] = await Promise.all([
        totalIncomesPromise,
        totalExpensesPromise,
      ]);

      runInAction(() => {
        this.totalIncomes = totalIncomesResult.data;
        this.totalExpenses = totalExpensesResult.data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response?.data?.message || error.message || '';
      });
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
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      });

      const totalIncomesPromise = IncomesClient.totalIncomes(date);
      const statsIncomesPromise = IncomesClient.statsIncomes(date);
      const totalExpensesPromise = ExpensesClient.totalExpenses(date);
      const statsExpensesPromise = ExpensesClient.statsExpenses(date);

      const [
        totalIncomesResult,
        statsIncomesResult,
        totalExpensesResult,
        statsExpensesResult,
      ] = await Promise.all([
        totalIncomesPromise,
        statsIncomesPromise,
        totalExpensesPromise,
        statsExpensesPromise,
      ]);

      runInAction(() => {
        this.totalIncomes = totalIncomesResult.data;
        this.statsIncomes = statsIncomesResult.data;
        this.totalExpenses = totalExpensesResult.data;
        this.statsExpenses = statsExpensesResult.data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.errorMsg = error.response?.data?.message || error.message || '';
      });
    }
  })
}
