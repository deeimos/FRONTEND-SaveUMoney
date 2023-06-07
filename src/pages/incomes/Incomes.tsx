import React, { useState, useMemo } from "react";
import { S } from "../styled";
import { IncomesList } from "../../components/incomes/IncomesList";
import { useStores } from "../../StoresProvider";
import { AddIncome } from "../../components/modals/incomes/AddIncomes";

export const Incomes = () => {
  const { addIncomeModalStore } = useStores();
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
    addIncomeModalStore.openModal(<AddIncome />);
  };

  return (
    <S.Content>
      <h1>Incomes</h1>
      <button onClick={handlePreviousMonth}> back </button>
      <button onClick={handleNextMonth}> next </button>
      <IncomesList formattedDate={formattedDate} />
      <button onClick={handleClick}>AddIncome</button>
      <AddIncome/>
    </S.Content>
  );
};

export default Incomes;
