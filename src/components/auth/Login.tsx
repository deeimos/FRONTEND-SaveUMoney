import React, { useContext } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { AuthClient } from "../../server/authClient";
import { S } from "./styled";
import { useStores } from "../../StoresProvider";
import { ILoginProps } from "../../const/types";
import { observer } from "mobx-react-lite";

const validationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required("Не введен адрес электронной почты"),
    password: yup
      .string()
      .required("Не введен пароль"),
  });

export const Login = observer(() => {
  const { userStore } = useStores();
  const initialValues: ILoginProps = { email: "", password: "" };

  const handleClick = async (values: ILoginProps) => {
    try {
      const userData = await AuthClient.login(values);
      userStore.SetIsAuth(userData.data);
    } catch (error: any) {
      console.log(error);
      const message = error.response.data.message;
      alert(message);
    }
  };

  return (
    <>
      <S.Header>Login</S.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: ILoginProps) => {
          handleClick(values);
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
});

export default Login;
