import React, { useMemo } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";
import moment from "moment";

import { IActionDtString, IBaseActionDtString } from "../../../const/types";
import { SModal } from "../styled";
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

type UpdateIncomeProps = {
  income: IActionDtString;
  date: string;
};
export const UpdateIncome = observer(({ income, date }: UpdateIncomeProps) => {
  const {
    updateIncomeModalStore,
    incomesStore,
    billsStore,
    incomesCategoriesStore,
  } = useStores();
  const initialValues: IBaseActionDtString = {
    billId: income?.billId ?? "",
    categoryId: income?.categoryId ?? "",
    description: income?.description ?? "",
    date: income?.date ?? "",
    value: income?.value ?? 0,
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

  const categoryOptions = incomesCategoriesStore.categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateIncomeModalStore.closeModal();
  };

  const handleSubmit = async (values: IBaseActionDtString) => {
    const updatedBill: IActionDtString = { ...values, _id: income._id };
    incomesStore.UpdateIncomeAction(updatedBill, { date: date });
    if (billsStore.errorMsg) alert(billsStore.errorMsg);
    updateIncomeModalStore.closeModal();
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

  return updateIncomeModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.UploadModal onClick={(e) => e.stopPropagation()}>
        <SModal.Header>Изменить доход</SModal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IBaseActionDtString) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IBaseActionDtString>) => (
            <Form className="upload__form">
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
                <SModal.Error>{props.errors.billId}</SModal.Error>
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
                <SModal.Error>{props.errors.categoryId}</SModal.Error>
              )}

              <Field
                type="string"
                name="date"
                placeholder="Дата дохода"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.date && props.errors.date && (
                <SModal.Error>{props.errors.date}</SModal.Error>
              )}

              <Field
                type="number"
                className={"input_number"}
                name="value"
                placeholder="0.00"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.value && props.errors.value && (
                <SModal.Error>{props.errors.value}</SModal.Error>
              )}

              <Field
                type="string"
                name="description"
                placeholder="Описание"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.description && props.errors.description && (
                <SModal.Error>{props.errors.description}</SModal.Error>
              )}

              <SModal.Control>
                <SModal.Button type="submit">Изменить</SModal.Button>
                <SModal.Button
                  type="button"
                  onClick={() => updateIncomeModalStore.closeModal()}
                >
                  Отмена
                </SModal.Button>
              </SModal.Control>
            </Form>
          )}
        </Formik>
      </SModal.UploadModal>
    </SModal.Modal>
  ) : null;
});

export default UpdateIncome;
