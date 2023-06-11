import React, { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";
import { IAction, IActionDtString } from "../../const/types";
import { toFormattedDate } from "../../utils/FormattedDate";
import { SComponents } from "../styled";

interface IncomesListProps {
  formattedDate: string;
  onButtonClick: (income: IActionDtString, action: string) => void;
}
export const IncomesList = observer(
  ({ formattedDate, onButtonClick }: IncomesListProps) => {
    const { billsStore, incomesStore, incomesCategoriesStore } = useStores();

    useEffect(() => {
      incomesStore.GetIncomesAction({ date: formattedDate });
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
      const currentIncome = {
        ...income,
        date: toFormattedDate.setFormattedDate(income.date),
      };
      onButtonClick(currentIncome, action);
    };

    return (
      <SComponents.Body>
        {incomesStore.incomes.map((item, index) => {
          return (
            <SComponents.Items key={index}>
              <SComponents.DateActions>
                {toFormattedDate.formattedDateText(item._id)}
              </SComponents.DateActions>
              {item.actions &&
                item.actions.length > 0 &&
                item.actions.map((income, incomeIndex) => {
                  return (
                    <SComponents.ActionItem key={incomeIndex}>
                      <SComponents.ItemInfo>
                        <SComponents.TextInfo>
                          {"Счет: " + findBillName(income.billId)}
                        </SComponents.TextInfo>
                        <SComponents.TextInfo>
                          {"Категория: " + findCategoryName(income.categoryId)}
                        </SComponents.TextInfo>
                        <SComponents.TextInfo>
                          {"Средств: " + income.value}
                        </SComponents.TextInfo>
                      </SComponents.ItemInfo>
                      <SComponents.ItemInfo>
                        <SComponents.TextDescription className="description">
                          {income.description || "Нет описания"}
                        </SComponents.TextDescription>
                      </SComponents.ItemInfo>
                      <SComponents.Control>
                        <SComponents.Button
                          onClick={() => handleClick(income, "update")}
                        >
                          Изменить
                        </SComponents.Button>
                        <SComponents.Button
                          onClick={() => handleClick(income, "delete")}
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
