import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";
import { IAction, IActionDtString } from "../../const/types";
import { DeleteIncome, UpdateIncome } from "../modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";

interface IncomesListProps {
  formattedDate: string;
}
export const IncomesList = observer(({ formattedDate }: IncomesListProps) => {
  const {
    billsStore,
    incomesStore,
    incomesCategoriesStore,
    deleteIncomeModalStore,
    updateIncomeModalStore,
  } = useStores();

  const [currentIncome, setCurrentIncome] = useState<IActionDtString>({
    billId: "",
    categoryId: "",
    date: "",
    description: "",
    _id: "",
    value: 0,
  });

  useEffect(() => {
    incomesStore.GetIncomesAction({ date: formattedDate });
    console.log(incomesStore.incomes);
  }, [incomesStore, formattedDate]);

  const findBillName = (billId: string) => {
    const billName = billsStore.bills.find((bill) => bill._id === billId);
    if (!billName) return "Ошибка, не удалось найти";
    return billName.name;
  };

  const findCategoryName = (categoryId: string) => {
    const categoryName = incomesCategoriesStore.categories.find(
      (category) => category._id === categoryId
    );
    if (!categoryName) return "Ошибка, не удалось найти";
    return categoryName.name;
  };

  useEffect(() => {
    billsStore.GetBillsAction();
    incomesCategoriesStore.GetCategoriesAction();
  }, [billsStore, incomesCategoriesStore]);

  if (!incomesStore.incomes || !incomesStore.incomes.length) return null;

  const handleClick = (income: IAction, action: string) => {
    setCurrentIncome({ ...income, date: toFormattedDate.setFormattedDate(income.date) });
    switch (action) {
      case "update":
        updateIncomeModalStore.openModal(
          <UpdateIncome income={currentIncome} />
        );
        break;
      case "delete":
        deleteIncomeModalStore.openModal(
          <DeleteIncome income={currentIncome} />
        );
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {incomesStore.incomes.map((item, index) => {
        return (
          <div key={index}>
            <p>{toFormattedDate.formattedDateText(item._id)}</p>
            {item.actions &&
              item.actions.length > 0 &&
              item.actions.map((income, incomeIndex) => {
                return (
                  <div key={incomeIndex}>
                    <p>{findBillName(income.billId)}</p>
                    <p>{findCategoryName(income.categoryId)}</p>
                    <p>{income.description}</p>
                    <p>{income.value}</p>
                    <button onClick={() => handleClick(income, "update")}>
                      Изменить
                    </button>
                    <button onClick={() => handleClick(income, "delete")}>
                      Удалить
                    </button>
                    <UpdateIncome income={currentIncome} />
                    <DeleteIncome income={currentIncome} />
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
});
