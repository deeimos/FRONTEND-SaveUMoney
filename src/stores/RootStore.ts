import { BillsStore } from "./BillsStore";
import { ExpnsesCategoriesStore } from "./ExpensesCategoriesStore";
import { ExpensesStore } from "./ExpensesStore";
import { IncomesCategoriesStore } from "./IncomesCategoriesStore";
import { IncomeStore } from "./IncomesStore";
import { ModalStore } from "./ModalStore";
import { ReviewStore } from "./ReviewStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore = new UserStore();

  billsStore: BillsStore = new BillsStore();
  addBillModalStore: ModalStore = new ModalStore();
  deleteBillModalStore: ModalStore = new ModalStore();
  updateBillModalStore: ModalStore = new ModalStore();

  incomesCategoriesStore: IncomesCategoriesStore = new IncomesCategoriesStore();
  expensesCategoriesStore: ExpnsesCategoriesStore = new ExpnsesCategoriesStore();

  incomesStore: IncomeStore = new IncomeStore();
  addIncomeModalStore: ModalStore = new ModalStore();
  deleteIncomeModalStore: ModalStore = new ModalStore();
  updateIncomeModalStore: ModalStore = new ModalStore();

  expensesStore: ExpensesStore = new ExpensesStore();
  addExpenseModalStore: ModalStore = new ModalStore();
  deleteExpenseModalStore: ModalStore = new ModalStore();
  updateExpenseModalStore: ModalStore = new ModalStore();

  infoModalStore: ModalStore = new ModalStore();

  reviewStore: ReviewStore = new ReviewStore();

}

export const rootStore: RootStore = new RootStore();