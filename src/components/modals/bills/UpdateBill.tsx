import React from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { IAddBill, IBill } from "../../../const/types";
import { SModal } from "../styled";
// import { S } from "./styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

const validationSchema = () =>
  yup.object().shape({
    name: yup.string().required("Не введено имя счета"),
    value: yup.string().required("Не введено значение"),
    description: yup.string(),
  });

type UpdateBillProps = {
  bill: IBill;
};
export const UpdateBill = observer(({ bill }: UpdateBillProps) => {
  const { updateBillModalStore, billsStore } = useStores();
  const initialValues: IAddBill = {
    name: bill?.name ?? "",
    value: bill?.value ?? 0,
    description: bill?.description ?? "",
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateBillModalStore.closeModal();
  };

  const handleSubmit = async (values: IAddBill) => {
    const updatedBill: IBill = { ...values, _id: bill._id };
    // if (billsStore.bills.find((bill) => bill.name === values.name))
    //   alert("Имена ваших счетов должно быть уникальным!");else
    billsStore.UpdateBillAction(updatedBill);
    if (billsStore.errorMsg) alert(billsStore.errorMsg);
    updateBillModalStore.closeModal();
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement>,
    setFieldValue: FormikProps<IAddBill>["setFieldValue"]
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        if (value === initialValues.name) setFieldValue("name", "");
        break;
      case "value":
        if (value === initialValues.value.toString())
          setFieldValue("value", "");
        break;
      case "description":
        if (value === initialValues.description)
          setFieldValue("description", "");
        break;
      default:
        if (value === "0" && name === "value") setFieldValue("value", "");
        break;
    }
  };

  return updateBillModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.UploadModal onClick={(e) => e.stopPropagation()}>
        <SModal.Header>Обновить счет</SModal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IAddBill) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IAddBill>) => (
            <Form className="upload__form">
              <Field
                type="text"
                name="name"
                placeholder="Имя счета"
                onClick={(e: any) => handleClick(e, props.setFieldValue)}
              />
              {props.touched.name && props.errors.name && (
                <SModal.Error>{props.errors.name}</SModal.Error>
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
                <SModal.Button type="submit">Обновить</SModal.Button>
                <SModal.Button
                  type="button"
                  onClick={() => updateBillModalStore.closeModal()}
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

export default UpdateBill;
