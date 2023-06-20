import React, { useState } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { IAddBill } from "../../../const/types";
import { SModal } from "../styled";
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
      <SModal.UploadModal onClick={(e) => e.stopPropagation()}>
        <SModal.Header>Добавить счет</SModal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IAddBill) => {
            handleSubmit(values);
          }}
        >
          {(props: FormikProps<IAddBill>) => (
            <Form className="upload__form">
              <Field type="text" name="name" placeholder="Имя счета" />
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
              <Field type="string" name="description" placeholder="Описание" />
              {props.touched.description && props.errors.description && (
                <SModal.Error>{props.errors.description}</SModal.Error>
              )}
              <SModal.Control>
                <SModal.Button type="submit">Добавить</SModal.Button>
                <SModal.Button
                  type="button"
                  onClick={() => addBillModalStore.closeModal()}
                >
                  Отмена
                </SModal.Button>
              </SModal.Control>
            </Form>
          )}
        </Formik>
        <InfoModal message={message} />
      </SModal.UploadModal>
    </SModal.Modal>
  ) : null;
});

export default AddBill;
