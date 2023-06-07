import React, { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";

interface IncomesListProps {
  formattedDate: string;
}
export const IncomesList = observer(({ formattedDate }: IncomesListProps) => {
  const { billsStore, incomesStore, incomesCategoriesStore} = useStores();

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
    console.log(1);
  }, [billsStore, incomesCategoriesStore]);

  useEffect(() => {
    incomesStore.GetIncomesAction({ date: formattedDate });
    console.log(2);
  }, [incomesStore, formattedDate]);

  return (
    <div>
      {incomesStore.incomes.map((item, index) => {
        return (
          <div key={index}>
            <p>Доходы {item._id}</p>
            {item.incomes.map((income, incomeIndex) => {
              return (
                <div key={incomeIndex}>
                  <p>{findBillName(income.billId)}</p>
                  <p>{findCategoryName(income.categoryId)}</p>
                  <p>{income.date.toString()}</p>
                  <p>{income.description}</p>
                  <p>{income.value}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});
