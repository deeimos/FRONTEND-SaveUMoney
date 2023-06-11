import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoresProvider";
import { IActionsTotal, IActionTotal } from "../../const/types";
import { toFormattedDate } from "../../utils/FormattedDate";
import { SComponents } from "../styled";
import { TotalActionsChart } from "./charts/TotalActionsChart";
import { BillsChart } from "./charts/BillsChart";
import { MonthActionsChart } from "./charts/MonthActionsChart";
import { IncomesCategoriesChart } from "./charts/IncomeCategoriesChart";
import { ExpenseCategoriesChart } from "./charts/ExpensesCategoriesChart";

interface ReviewItemsProps {
  formattedDate: string;
}

export const ReviewItems = ({ formattedDate }: ReviewItemsProps) => {
  return (
    <>
      <BillsChart />
      <TotalActionsChart formattedDate={formattedDate}/>
      <MonthActionsChart formattedDate={formattedDate}/>
      <IncomesCategoriesChart formattedDate={formattedDate}/>
      <ExpenseCategoriesChart formattedDate={formattedDate}/>
    </>
  );
};
