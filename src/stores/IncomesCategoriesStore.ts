import { makeObservable, observable, action, runInAction } from 'mobx';
import { ICategory } from '../const/types';
import CategoriesClient from '../server/categoriesClient';

export class IncomesCategoriesStore {
  isLoading: boolean;
  categories: ICategory[];
  countCategories: number;
  errorMsg: string;

  constructor() {
    this.categories = [];
    this.countCategories = 0;
    this.isLoading = false;
    this.errorMsg = '';

    makeObservable(this, {
      categories: observable,
      isLoading: observable,
      GetCategoriesAction: action,
    });
  }

  GetCategoriesAction = action(async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.errorMsg = '';
      })

      const result = await CategoriesClient.getIncomesCategories();

      if (result && result?.data) {
        runInAction(() => {
          this.categories = result.data;
          this.countCategories = result.data.length;
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
}
