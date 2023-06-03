import React, { useState } from "react";
import { Formik, FormikProps, FormikHelpers, Form, Field } from "formik";
import * as yup from "yup";

import { S } from "./styled";
import { IRegisterProps } from "../../const/types";
import { AuthClient } from "../../server/index";
import { act } from "@testing-library/react";

const validationSchema = () =>
  yup.object().shape({
    username: yup
      .string()
      .required("Не введено имя")
      .min(2, "Длина имени должна быть минимум 2 символа"),
    email: yup
      .string()
      .required("Не введен адрес электронной почты")
      .email("Неверный email"),
    password: yup
      .string()
      .required("Не введен пароль")
      .min(8, "Длина пароля должна быть минимум 8 символов")
      .matches(
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d!@#$%^&*()_+-=,./<>?;':"[\]\\{}|`~]+$/,
        "Пароль должен содержать хотя бы одну букву нижнего регистра, хотя бы одну высокого регистра и хотя бы одну цифру"
      ),
  });

export const Registration = () => {
  const [isSending, setIsSending] = useState(false);
  const initialValues: IRegisterProps = {
    username: "",
    email: "",
    password: "",
  };

  const handleClick = async (
    values: IRegisterProps,
    actions: FormikHelpers<IRegisterProps>
  ) => {
    try {
      const userData = await AuthClient.register(values);
      actions.resetForm();
      setIsSending(!isSending);
    } catch (error: any) {
      console.log(error);
      const message = error.response.data.message;
      alert(message);
    }
  };

  const handleBlur = () => {
    if (isSending) setIsSending(!isSending);
  };

  return (
    <>
      <S.Header>Login</S.Header>
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
            <button type="submit">Submit</button>
            {isSending && <div>Вы зарегистрировались</div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Registration;
