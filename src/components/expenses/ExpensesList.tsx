import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";
import { IAction, IActionDtString } from "../../const/types";
import { toFormattedDate } from "../../utils/FormattedDate";
import { SComponents } from "../styled";

interface ExpensesListProps {
  formattedDate: string;
  onButtonClick: (expense: IActionDtString, action: string) => void;
}
export const ExpensesList = observer(
  ({ formattedDate, onButtonClick }: ExpensesListProps) => {
    const { billsStore, expensesStore, expensesCategoriesStore } = useStores();

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
    const handleClick = (income: IAction, action: string) => {
      const currentExpense = {
        ...income,
        date: toFormattedDate.setFormattedDate(income.date),
      };
      onButtonClick(currentExpense, action);
    };

    return (
      <SComponents.Body>
        {expensesStore.expenses.map((item, index) => {
          return (
            <SComponents.Items key={index}>
              <SComponents.DateActions>
                {toFormattedDate.formattedDateText(item._id)}
              </SComponents.DateActions>
              {item.actions &&
                item.actions.length > 0 &&
                item.actions.map((expense, expenseIndex) => {
                  return (
                    <SComponents.ActionItem key={expenseIndex}>
                      <SComponents.ItemInfo>
                        <SComponents.TextInfo>
                          {"Счет: " + findBillName(expense.billId)}
                        </SComponents.TextInfo>
                        <SComponents.TextInfo>
                          {"Категория:" + findCategoryName(expense.categoryId)}
                        </SComponents.TextInfo>
                        <SComponents.TextInfo>
                          {"Средств: " + expense.value}
                        </SComponents.TextInfo>
                      </SComponents.ItemInfo>
                      <SComponents.ItemInfo>
                        <SComponents.TextDescription>
                          {expense.description || "Нет описания"}
                        </SComponents.TextDescription>
                      </SComponents.ItemInfo>
                      <SComponents.Control>
                        <SComponents.Button
                          onClick={() => handleClick(expense, "update")}
                        >
                          Изменить
                        </SComponents.Button>
                        <SComponents.Button
                          onClick={() => handleClick(expense, "delete")}
                        >
                          Удалить
                        </SComponents.Button>
                      </SComponents.Control>
                    </SComponents.ActionItem>
                  );
                })}
            </SComponents.Items>
          );
        })}
      </SComponents.Body>
    );
  }
);
