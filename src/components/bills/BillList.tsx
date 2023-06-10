import React, { useEffect} from "react";
import { IBill } from "../../const/types";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { localization } from "../../localization";
import { S } from "./styled";

interface BillsListProps {
  onButtonClick: (bill: IBill, action: string) => void;
}
export const BillList = observer(({onButtonClick}: BillsListProps) => {
  const { billsStore } =
    useStores();

  useEffect(() => {
    billsStore.GetBillsAction();
  }, [billsStore]);

  const handleClick = (bill: IBill, action: string) => {
    onButtonClick(bill, action);
  };
  return (
    <S.Body>
      {billsStore.bills.map((bill) => {
        return (
          <S.Item key={bill._id}>
            <S.ItemInfo>
              <S.TextInfo>{bill.name}</S.TextInfo>
              <S.Description>{bill.description || bill.name}</S.Description>
              <S.TextInfo>
                {localization.bills.value + ": " + bill.value}
              </S.TextInfo>
            </S.ItemInfo>
            <S.Control>
              <S.Button onClick={() => handleClick(bill, "update")}>
                {localization.update}
              </S.Button>
              <S.Button onClick={() => handleClick(bill, "delete")}>
                {localization.delete}
              </S.Button>
            </S.Control>
          </S.Item>
        );
      })}
    </S.Body>
  );
});
