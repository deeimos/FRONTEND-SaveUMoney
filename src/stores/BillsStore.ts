import { makeObservable, observable, computed, action } from 'mobx';

import React from 'react';
import { IBill } from '../const/types';

export class BillStore {
  isUpdated: boolean;
  listBill:  IBill[];
  countBill: number;

  constructor(){
    this.listBill = [];
    this.countBill = 0;
    this.isUpdated = false;

    makeObservable (this, {
      isUpdated: observable,
      AddBill: action,
      DelBill: action,
      UpdateBill: action,
      SetFalseIsUpdated: action,
    });
  }

  AddBill(){
    this.countBill += 1;
    this.isUpdated = true;
  }

  DelBill(){
    this.countBill -= 1;
    this.isUpdated = true;
  }

  UpdateBill(){
    this.isUpdated = true;
  }

  SetFalseIsUpdated(){
    this.isUpdated = false;
  }
}