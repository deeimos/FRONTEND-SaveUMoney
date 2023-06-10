import React, { useState } from "react";
import { Formik, FormikProps, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";

import { AuthClient } from "../../server/index";
import { S } from "./styled";
import { useStores } from "../../StoresProvider";
import { ILoginProps } from "../../const/types";
import { observer } from "mobx-react-lite";
import { localization } from "../../localization";
import { InfoModal } from "../modals/error/InfoModal";

const validationSchema = () =>
  yup.object().shape({
    email: yup.string().required(localization.auth.validation.skipedEmail),
    password: yup
      .string()
      .required(localization.auth.validation.skipedPassword),
  });

export const Login = observer(() => {
  const { userStore, infoModalStore } = useStores();
  const [message, setMessage] = useState("");
  const initialValues: ILoginProps = { email: "", password: "" };

  const handleClick = async (
    values: ILoginProps,
    actions: FormikHelpers<ILoginProps>
  ) => {
    try {
      const userData = await AuthClient.login(values);
      userStore.SetIsAuth(userData.data);
    } catch (error: any) {
      switch (error.response?.data?.message) {
        case "User not found":
          setMessage(localization.auth.userNotFound);
          actions.resetForm();
          infoModalStore.openModal(<InfoModal message={message} />);
          break;
        case "Invalid password":
          setMessage(localization.auth.invalidPassword);
          actions.resetForm();
          infoModalStore.openModal(<InfoModal message={message} />);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <S.Header>{localization.auth.authorization}</S.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: ILoginProps,
          actions: FormikHelpers<ILoginProps>
        ) => {
          handleClick(values, actions);
        }}
      >
        {(props: FormikProps<ILoginProps>) => (
          <Form>
            <Field
              type="text"
              name="email"
              placeholder="Адрес электронной почты"
            />
            {props.touched.email && props.errors.email && (
              <div>{props.errors.email}</div>
            )}
            <Field type="password" name="password" placeholder="Пароль" />
            {props.touched.password && props.errors.password && (
              <div>{props.errors.password}</div>
            )}
            <button type="submit">{localization.auth.buttonLogin}</button>
          </Form>
        )}
      </Formik>
      <InfoModal message={message} />
    </>
  );
});

export default Login;
