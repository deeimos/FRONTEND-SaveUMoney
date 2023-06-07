import React, { useState } from "react";
import { Formik, FormikProps, FormikHelpers, Form, Field } from "formik";
import * as yup from "yup";

import { S } from "./styled";
import { IRegisterProps } from "../../const/types";
import { AuthClient } from "../../server/index";
import { localization } from "../../localization";
import { useStores } from "../../StoresProvider";
import { InfoModal } from "../modals/error/InfoModal";
import { observer } from "mobx-react-lite";

const validationSchema = () =>
  yup.object().shape({
    username: yup
      .string()
      .required(localization.auth.validation.skipedUserName)
      .min(2, localization.auth.validation.invalidUserName),
    email: yup
      .string()
      .required(localization.auth.validation.skipedEmail)
      .email(localization.auth.validation.invalidEmail),
    password: yup
      .string()
      .required(localization.auth.validation.skipedPassword)
      .min(8, localization.auth.validation.smallLenPassword)
      .matches(
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d!@#$%^&*()_+-=,./<>?;':"[\]\\{}|`~]+$/,
        localization.auth.validation.invalidPassword
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], localization.auth.validation.skipedRepeatPassword)
      .required(localization.auth.validation.notEqualRepeatPassword),
  });

export const Registration = observer(() => {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const { infoModalStore } = useStores();

  const initialValues: IRegisterProps = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleClick = async (
    values: IRegisterProps,
    actions: FormikHelpers<IRegisterProps>
  ) => {
    try {
      await AuthClient.register(values);
      setMessage(localization.auth.registerMessage);
      actions.resetForm();
      infoModalStore.openModal(<InfoModal message={message} />);
    } catch (error: any) {
      switch (error.response.data.message) {
        case "User already exists":
          setMessage(localization.auth.userAlredyExist);
          actions.resetForm();
          infoModalStore.openModal(<InfoModal message={message} />);
          break;
        default:
          break;
      }
    }
  };

  const handleBlur = () => {
    if (isSending) setIsSending(!isSending);
  };

  return (
    <>
      <S.Header>{localization.auth.registration}</S.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: IRegisterProps,
          actions: FormikHelpers<IRegisterProps>
        ) => {
          handleClick(values, actions);
        }}
      >
        {(props: FormikProps<IRegisterProps>) => (
          <Form>
            <Field
              type="text"
              name="username"
              placeholder="Имя"
              onBlur={handleBlur}
            />
            {props.touched.username && props.errors.username && (
              <div>{props.errors.username}</div>
            )}
            <Field
              type="text"
              name="email"
              placeholder="Адрес электронной почты"
              onBlur={handleBlur}
            />
            {props.touched.email && props.errors.email && (
              <div>{props.errors.email}</div>
            )}
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              onBlur={handleBlur}
            />
            {props.touched.password && props.errors.password && (
              <div>{props.errors.password}</div>
            )}
            <Field
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
              onBlur={handleBlur}
            />
            {props.touched.repeatPassword && props.errors.repeatPassword && (
              <div>{props.errors.repeatPassword}</div>
            )}
            <button type="submit">{localization.auth.buttonRegister}</button>
          </Form>
        )}
      </Formik>
      <InfoModal message={message} />
    </>
  );
});

export default Registration;
