import React, { useState, useMemo } from "react";
import { SPage } from "../styled";
import { useStores } from "../../StoresProvider";
import { toFormattedDate } from "../../utils/FormattedDate";
import { localization } from "../../localization";
import { ReviewItems } from "../../components/review/ReviewItems";

export const Main = () => {
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(currentDate);

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

  return (
    <SPage.Content>
      <SPage.Header>
        <SPage.Title>Обзор</SPage.Title>
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
        <ReviewItems formattedDate={toFormattedDate.setFormattedDate(date)} />
      </SPage.Body>
    </SPage.Content>
  );
};
