import React, { useState, useMemo } from "react";
import { SPage } from "../styled";
import { IncomesList } from "../../components/incomes/IncomesList";
import { useStores } from "../../StoresProvider";
import { AddIncome } from "../../components/modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";

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
    <SPage.Content>
      <h1>Incomes</h1>
      <button onClick={handlePreviousMonth}> back </button>
      <h3>{toFormattedDate.formattedDateHeader(date)}</h3>
      <button onClick={handleNextMonth}> next </button>
      <IncomesList formattedDate={formattedDate} />
      <button onClick={handleClick}>AddIncome</button>
      <AddIncome/>
    </SPage.Content>
  );
};

export default Incomes;
