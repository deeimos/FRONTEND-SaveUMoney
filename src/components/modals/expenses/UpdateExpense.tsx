import React, { useMemo } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";
import moment from "moment";

import { IActionDtString, IBaseActionDtString } from "../../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

const validationSchema = yup.object().shape({
  billId: yup.string().required("Не выбран счет"),
  categoryId: yup.string().required("Не выбрана категория"),
  date: yup
    .string()
    .required("Не выбрана дата")
    .test("valid-date", "Неверный формат даты (ДД.ММ.ГГГГ)", function (value) {
      if (!value) return false;
      const mDate = moment(value, "DD.MM.YYYY");
      if (!mDate.isValid()) return false;

      const dayOfMonth = mDate.date();
      const monthOfYear = mDate.month() + 1;

      if (
        dayOfMonth >
        moment(`${monthOfYear}/01/${mDate.year()}`, "MM/DD/YYYY")
          .endOf("month")
          .date()
      ) {
        return false;
      }

      return true;
    })
    .test(
      "future-date",
      "Дата не может быть позже сегодняшнего дня",
      function (value) {
        if (!value) return false;
        return moment(value, "DD.MM.YYYY").isSameOrBefore(moment(), "day");
      }
    ),
  value: yup.string().required("Не введено значение"),
  description: yup.string(),
});

type UpdateExpenseProps = {
  expense: IActionDtString;
};
export const UpdateExpense = observer(({ expense }: UpdateExpenseProps) => {
  const {
    updateExpenseModalStore,
    expensesStore,
    billsStore,
    expensesCategoriesStore,
  } = useStores();
  const initialValues: IBaseActionDtString = {
    billId: expense?.billId ?? "",
    categoryId: expense?.categoryId ?? "",
    description: expense?.description ?? "",
    date: expense?.date ?? "",
    value: expense?.value ?? 0,
  };

  const currentDate = useMemo(() => new Date(), []);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("ru", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(currentDate)
        .toString(),
    [currentDate]
  );

  const billOptions = billsStore.bills.map((bill) => ({
    value: bill._id,
    label: bill.name,
  }));

  const categoryOptions = expensesCategoriesStore.categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateExpenseModalStore.closeModal();
  };

  const handleSubmit = async (values: IBaseActionDtString) => {
    const updatedBill: IActionDtString = { ...values, _id: expense._id };
    expensesStore.UpdateExpenseAction(updatedBill, { date: formattedDate });
    if (billsStore.errorMsg) alert(billsStore.errorMsg);
    updateExpenseModalStore.closeModal();
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement>,
    setFieldValue: FormikProps<IBaseActionDtString>["setFieldValue"]
  ) => {
    const { value, name } = e.currentTarget;
    switch (name) {
      // case "billId":
      //   if (value === initialValues.billId) setFieldValue("billId", "");
      //   break;
      // case "categoryId":
      //   if (value === initialValues.categoryId) setFieldValue("categoryId", "");
      //   break;
      case "description":
        if (value === initialValues.description)
          setFieldValue("description", "");
        break;
      case "date":
        if (value === initialValues.date) setFieldValue("date", "");
        break;
      case "value":
        if (value === initialValues.value.toString())
          setFieldValue("value", "");
        break;
      default:
        if (name === "value" && value === "0") setFieldValue("value", "");
        if (name === "date" && value === formattedDate)
          setFieldValue("date", "");
        break;
    }
  };

  return updateExpenseModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Header>UpdateExpense</S.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IBaseActionDtString) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IBaseActionDtString>) => (
            <Form>
              <Field
                id="billId"
                name="billId"
                as="select"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              >
                <option value="">Выберите счет</option>
                {billOptions.map((option: any) => {
                  return (
                    <option value={option.value} key={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </Field>
              {props.touched.billId && props.errors.billId && (
                <div>{props.errors.billId}</div>
              )}

              <Field
                id="categoryId"
                name="categoryId"
                as="select"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              >
                <option value="">Выберите категорию</option>
                {categoryOptions.map((option: any) => {
                  return (
                    <option value={option.value} key={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </Field>
              {props.touched.categoryId && props.errors.categoryId && (
                <div>{props.errors.categoryId}</div>
              )}

              <Field
                type="string"
                name="date"
                placeholder="Дата дохода"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.date && props.errors.date && (
                <div>{props.errors.date}</div>
              )}

              <Field
                type="number"
                className={"input_number"}
                name="value"
                placeholder="0.00"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.value && props.errors.value && (
                <div>{props.errors.value}</div>
              )}

              <Field
                type="string"
                name="description"
                placeholder="Описание"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.description && props.errors.description && (
                <div>{props.errors.description}</div>
              )}

              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => updateExpenseModalStore.closeModal()}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default UpdateExpense;
