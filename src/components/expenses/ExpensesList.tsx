import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";
import { IAction, IActionDtString } from "../../const/types";
import { UpdateExpense, DeleteExpense } from "../modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";

interface ExpensesListProps {
  formattedDate: string;
}
export const ExpensesList = observer(({ formattedDate }: ExpensesListProps) => {
  const {
    billsStore,
    expensesStore,
    expensesCategoriesStore,
    deleteExpenseModalStore,
    updateExpenseModalStore,
  } = useStores();

  const [currentExpense, setCurrentExpense] = useState<IActionDtString>({
    billId: "",
    categoryId: "",
    date: "",
    description: "",
    _id: "",
    value: 0,
  });

  useEffect(() => {
    expensesStore.GetExpensesAction({ date: formattedDate });
  }, [expensesStore, formattedDate]);

  const findBillName = (billId: string) => {
    const billName = billsStore.bills.find((bill) => bill._id === billId);
    if (!billName) return "Ошибка, не удалось найти";
    return billName.name;
  };

  const findCategoryName = (categoryId: string) => {
    const categoryName = expensesCategoriesStore.categories.find(
      (category) => category._id === categoryId
    );
    if (!categoryName) return "Ошибка, не удалось найти";
    return categoryName.name;
  };

  useEffect(() => {
    billsStore.GetBillsAction();
    expensesCategoriesStore.GetCategoriesAction();
  }, [billsStore, expensesCategoriesStore]);

  if (!expensesStore.expenses || !expensesStore.expenses.length) return null;

  const handleClick = (expense: IAction, action: string) => {
    setCurrentExpense({ ...expense, date: toFormattedDate.setFormattedDate(expense.date) });
    switch (action) {
      case "update":
        updateExpenseModalStore.openModal(
          <UpdateExpense expense={currentExpense} />
        );
        break;
      case "delete":
        deleteExpenseModalStore.openModal(
          <DeleteExpense expense={currentExpense} />
        );
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {expensesStore.expenses.map((item, index) => {
        return (
          <div key={index}>
            <p>{toFormattedDate.formattedDateText(item._id)}</p>
            {item.actions && item.actions.length > 0 && item.actions.map((expense, expenseIndex) => {
              return (
                <div key={expenseIndex}>
                  <p>{findBillName(expense.billId)}</p>
                  <p>{findCategoryName(expense.categoryId)}</p>
                  <p>{expense.description}</p>
                  <p>{expense.value}</p>
                  <button onClick={() => handleClick(expense, "update")}>Изменить</button>
                  <button onClick={() => handleClick(expense, "delete")}>
                    Удалить
                  </button>
                  <UpdateExpense expense={currentExpense} />
                  <DeleteExpense expense={currentExpense} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

