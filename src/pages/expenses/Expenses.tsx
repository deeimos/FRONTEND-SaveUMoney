import React, { useState, useMemo } from "react";
import { S } from "../styled";
import { useStores } from "../../StoresProvider";
import { ExpensesList } from "../../components/expenses/ExpensesList";
import { AddExpense } from "../../components/modals/index";

export const Expenses = () => {
  const { addExpenseModalStore } = useStores();
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(currentDate);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("ru", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(date)
        .toString(),
    [date]
  );

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
    addExpenseModalStore.openModal(<AddExpense />);
  };

  return (
    <S.Content>
      <h1>Expenses</h1>
      <button onClick={handlePreviousMonth}> back </button>
      <button onClick={handleNextMonth}> next </button>
      <ExpensesList formattedDate={formattedDate} />
      <button onClick={handleClick}>Add Expense</button>
      <AddExpense />
    </S.Content>
  );
};

export default Expenses;
