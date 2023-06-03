import React, { useEffect, useState} from "react";
import { BillsClient } from "../../server";
import { IBill } from "../../const/types";

export const BillList = () => {
  const [bills, setBills] = useState(Array<IBill>);
  useEffect(() => {
    BillsClient.getBills()
      .then((response) => setBills(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(bills);

  const handleClick = (id: string, action: string) => {
    switch (action) {
      case "update":
        console.log(action);
        console.log(id);
        break;
      case "delete":
        console.log(action);
        console.log(id);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {bills.map((bill) => {
        return (
          <div>
            <h2>{bill.name}</h2>
            <h4>{bill.description}</h4>
            <h3>{bill.value}</h3>
            <button onClick={() => handleClick(bill._id, 'update')}>Update</button>
            <button onClick={() => handleClick(bill._id, 'delete')}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
