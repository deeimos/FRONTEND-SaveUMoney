import React, { useState, useMemo } from "react";
import { SPage } from "../styled";
import { IncomesList } from "../../components/incomes/IncomesList";
import { useStores } from "../../StoresProvider";
import {
  AddIncome,
  DeleteIncome,
  UpdateIncome,
} from "../../components/modals/index";
import { toFormattedDate } from "../../utils/FormattedDate";
import { localization } from "../../localization";
import { IActionDtString } from "../../const/types";

export const Incomes = () => {
  const {
    addIncomeModalStore,
    updateIncomeModalStore,
    deleteIncomeModalStore,
  } = useStores();
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(currentDate);

  const [currentIncome, setCurrentIncome] = useState<IActionDtString>({
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
    addIncomeModalStore.openModal(
      <AddIncome date={toFormattedDate.setFormattedDate(date)} />
    );
  };

  const onButtonClick = (income: IActionDtString, action: string) => {
    setCurrentIncome(income);
    switch (action) {
      case "update":
        updateIncomeModalStore.openModal(
          <UpdateIncome
            income={currentIncome}
            date={toFormattedDate.setFormattedDate(date)}
          />
        );
        break;
      case "delete":
        deleteIncomeModalStore.openModal(
          <DeleteIncome
            income={currentIncome}
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
        <SPage.Title>Доходы</SPage.Title>
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
        <IncomesList
          formattedDate={toFormattedDate.setFormattedDate(date)}
          onButtonClick={onButtonClick}
        />
      </SPage.Body>
      <SPage.Button onClick={handleClick}>{localization.add}</SPage.Button>
      <AddIncome date={toFormattedDate.setFormattedDate(date)} />
      <UpdateIncome
        income={currentIncome}
        date={toFormattedDate.setFormattedDate(date)}
      />
      <DeleteIncome
        income={currentIncome}
        date={toFormattedDate.setFormattedDate(date)}
      />
    </SPage.Content>
  );
};

export default Incomes;
