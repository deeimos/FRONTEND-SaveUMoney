import React, { useState, useMemo } from "react";
import { SPage } from "../styled";
import { useStores } from "../../StoresProvider";
import { ExpensesList } from "../../components/expenses/ExpensesList";
import {
  AddExpense,
  DeleteExpense,
  UpdateExpense,
} from "../../components/modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";
import { localization } from "../../localization";
import { IActionDtString } from "../../const/types";

export const Expenses = () => {
  const {
    addExpenseModalStore,
    updateExpenseModalStore,
    deleteExpenseModalStore,
  } = useStores();
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(currentDate);

  const [currentExpense, setCurrentExpense] = useState<IActionDtString>({
    billId: "",
    categoryId: "",
    date: "",
    description: "",
    _id: "",
    value: 0,
  });

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);

    if (newDate <= currentDate) {
      setDate(newDate);
    }
  };

  const handleClick = () => {
    addExpenseModalStore.openModal(<AddExpense date={toFormattedDate.setFormattedDate(date)}/>);
  };

  const onButtonClick = (expense: IActionDtString, action: string) => {
    setCurrentExpense(expense);
    switch (action) {
      case "update":
        updateExpenseModalStore.openModal(
          <UpdateExpense
            expense={currentExpense}
            date={toFormattedDate.setFormattedDate(date)}
          />
        );
        break;
      case "delete":
        deleteExpenseModalStore.openModal(
          <DeleteExpense
            expense={currentExpense}
            date={toFormattedDate.setFormattedDate(date)}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <SPage.Content>
      <SPage.Header>
        <SPage.Title>Расходы</SPage.Title>
        <SPage.Control>
          <SPage.ControlButton onClick={handlePreviousMonth}>
            {"<"}
          </SPage.ControlButton>
          <SPage.ControlText>
            {toFormattedDate.formattedDateHeader(date)}
          </SPage.ControlText>
          <SPage.ControlButton onClick={handleNextMonth}>
            {">"}
          </SPage.ControlButton>
        </SPage.Control>
      </SPage.Header>
      <SPage.Body>
        <ExpensesList
          formattedDate={toFormattedDate.setFormattedDate(date)}
          onButtonClick={onButtonClick}
        />
      </SPage.Body>
      <SPage.Button onClick={(handleClick)}>{localization.add}</SPage.Button>
      <AddExpense date={toFormattedDate.setFormattedDate(date)}/>
      <UpdateExpense
        expense={currentExpense}
        date={toFormattedDate.setFormattedDate(date)}
      />
      <DeleteExpense
        expense={currentExpense}
        date={toFormattedDate.setFormattedDate(date)}
      />
    </SPage.Content>
  );
};

export default Expenses;
