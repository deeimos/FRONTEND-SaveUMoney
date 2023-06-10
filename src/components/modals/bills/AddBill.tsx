import React, { useState } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { IAddBill } from "../../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";
import InfoModal from "../error/InfoModal";
import { localization } from "../../../localization";

const validationSchema = () =>
  yup.object().shape({
    name: yup.string().required("Не введено имя счета"),
    value: yup.string().required("Не введено значение"),
    desciption: yup.string(),
  });

export const AddBill = observer(() => {
  const { addBillModalStore, billsStore, infoModalStore } = useStores();
  const [message, setMessage] = useState("");
  const initialValues: IAddBill = { name: "", value: 0, description: "" };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    addBillModalStore.closeModal();
  };

  const handleSubmit = async (values: IAddBill) => {
    if (billsStore.countBill < 6) {
      if (billsStore.bills.find((bill) => bill.name === values.name)) {
        setMessage(localization.bills.invalidName);
        infoModalStore.openModal(<InfoModal message={message} />);
      } else billsStore.AddBillAction(values);
      if (billsStore.errorMsg) alert(billsStore.errorMsg);
    } else {
      setMessage(localization.bills.addError);
      infoModalStore.openModal(<InfoModal message={message} />);
    }
    if (!infoModalStore.modal.isOpened) addBillModalStore.closeModal();
  };

  const handleClick = (
    e: React.MouseEvent<HTMLInputElement>,
    setFieldValue: FormikProps<IAddBill>["setFieldValue"]
  ) => {
    const { value } = e.currentTarget;
    if (value === "0") {
      setFieldValue("value", "");
    }
  };

  return addBillModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Header>AddBill</S.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IAddBill) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IAddBill>) => (
            <Form>
              <Field type="text" name="name" placeholder="Имя счета" />
              {props.touched.name && props.errors.name && (
                <div>{props.errors.name}</div>
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
              <Field type="string" name="description" placeholder="Описание" />
              {props.touched.description && props.errors.description && (
                <div>{props.errors.description}</div>
              )}
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => addBillModalStore.closeModal()}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
        <InfoModal message={message} />
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default AddBill;
