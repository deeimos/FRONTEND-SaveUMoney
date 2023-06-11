import React from "react";
import { SComponents } from "../styled";
import { S } from "./styled";
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
    <SComponents.Body>
      <S.Items>
        <BillsChart />
        <TotalActionsChart formattedDate={formattedDate} />
      </S.Items>
      <S.Items>
        <MonthActionsChart formattedDate={formattedDate}/>
      </S.Items>
      <S.Items>
          <IncomesCategoriesChart formattedDate={formattedDate} />
          <ExpenseCategoriesChart formattedDate={formattedDate} />
      </S.Items>
    </SComponents.Body>
  );
};
