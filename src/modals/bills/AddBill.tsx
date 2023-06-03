import React, { useContext } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { IAddBill, IBill } from "../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { BillsClient } from "../../server";

const validationSchema = () =>
  yup.object().shape({
    name: yup.string().required("Не введено имя счета"),
    value: yup.string().required("Не введено значение"),
    desciption: yup.string(),
  });

export const AddBill = observer(() => {
  const { modalStore } = useStores();
  const initialValues: IAddBill = { name: "", value: 0, description: "" };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
    modalStore.closeModal();
  }

  const handleSubmit = async (values: IAddBill) => {
    try {
      const bill = await BillsClient.addBill(values);
      console.log(bill)
      modalStore.closeModal();
    } catch (error: any) {
      console.log(error);
      const message = error.response.data.message;
      alert(message);
    }
  };

  return modalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={e => e.stopPropagation()}>
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
              <Field type="number" className={"input_number"} name="value" placeholder="0.00" />
              {props.touched.value && props.errors.value && (
                <div>{props.errors.value}</div>
              )}
              <Field type="string" name="desciption" placeholder="Описание" />
              {props.touched.value && props.errors.value && (
                <div>{props.errors.value}</div>
              )}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default AddBill;
