import React, { useMemo } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";
import moment from "moment";

import { IBaseActionDtString } from "../../../const/types";
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


export const AddIncome = observer(() => {
  const {
    addIncomeModalStore,
    incomesStore,
    billsStore,
    incomesCategoriesStore,
  } = useStores();

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
  const initialValues: IBaseActionDtString = {
    billId: "",
    categoryId: "",
    date: formattedDate,
    value: 0,
    description: "",
  };

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
    addIncomeModalStore.closeModal();
  };

  const handleSubmit = async (values: IBaseActionDtString) => {
    incomesStore.AddIncomeAction(values, { date: formattedDate });
    if (billsStore.errorMsg) alert(billsStore.errorMsg);
    addIncomeModalStore.closeModal();
  };

  const handleClickValue = (
    e: React.MouseEvent<HTMLInputElement>,
    setFieldValue: FormikProps<IBaseActionDtString>["setFieldValue"]
  ) => {
    const { value } = e.currentTarget;
    if (value === "0") {
      setFieldValue("value", "");
    }
  };
  const handleClickDate = (
    e: React.MouseEvent<HTMLInputElement>,
    setFieldValue: FormikProps<IBaseActionDtString>["setFieldValue"]
  ) => {
    const { value } = e.currentTarget;
    if (value === formattedDate) {
      setFieldValue("date", "");
    }
  };

  return addIncomeModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Header>AddIncome</S.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IBaseActionDtString) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IBaseActionDtString>) => (
            <Form>
              <Field id="billId" name="billId" as="select">
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

              <Field id="categoryId" name="categoryId" as="select">
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
                onClick={(e: any) => handleClickDate(e, props.setFieldValue)}
              />
              {props.touched.date && props.errors.date && (
                <div>{props.errors.date}</div>
              )}

              <Field
                type="number"
                className={"input_number"}
                name="value"
                placeholder="0.00"
                onClick={(e: any) => handleClickValue(e, props.setFieldValue)}
              />
              {props.touched.value && props.errors.value && (
                <div>{props.errors.value}</div>
              )}

              <Field type="string" name="description" placeholder="Описание" />
              {props.touched.description && props.errors.description && (
                <div>{props.errors.description}</div>
              )}

              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => addIncomeModalStore.closeModal()}
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

export default AddIncome;
// const bill = billsStore.bills.find((item) => item.name === values.billName);
// if (!bill) return "Ошибка, не удалось найти";

// const category = incomesCategoriesStore.categories.find(
//   (item) => item.name === values.categoryName
// );

// if (!category) return "Ошибка, не удалось найти";
// const newIncome: IBaseActionDtString = {
//   ...values,
//   billId: bill._id,
//   categoryId: category._id,
//   date: values.date.toString(),
// };

// IncomesClient.addIncome(newIncome);
// addIncomeModalStore.closeModal();
