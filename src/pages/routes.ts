import * as paths from '../const/paths';
import * as pages from './index';

export const publicRoutes = [
  {
    path: paths.auth,
    Element: pages.Auth
  }
];

export const authRoutes = [
  {
    path: paths.main,
    Element: pages.Main
  },
  {
    path: paths.bills,
    Element: pages.Bills
  },
  {
    path: paths.incomes,
    Element: pages.Incomes
  },
  {
    path: paths.expenses,
    Element: pages.Expenses
  }
]