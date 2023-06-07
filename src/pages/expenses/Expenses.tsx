import React, { useState, useMemo } from "react";
import { SPage } from "../styled";
import { useStores } from "../../StoresProvider";
import { ExpensesList } from "../../components/expenses/ExpensesList";
import { AddExpense } from "../../components/modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";

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
    <SPage.Content>
      <h1>Expenses</h1>
      <button onClick={handlePreviousMonth}> back </button>
      <h3>{toFormattedDate.formattedDateHeader(date)}</h3>
      <button onClick={handleNextMonth}> next </button>
      <ExpensesList formattedDate={formattedDate} />
      <button onClick={handleClick}>Add Expense</button>
      <AddExpense />
    </SPage.Content>
  );
};

export default Expenses;
