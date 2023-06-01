import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { auth, main } from "../const/paths";

type IProps = {
  path: string;
  children: JSX.Element;
};
const ReqireAuth = ({ children, path }: IProps) => {
  const isAuth = true;

  if (!isAuth) return <Navigate to={auth} />;
  if (isAuth && path === auth) return <Navigate to={main} />;

  return children;
};

const PageRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ReqireAuth path={path}>
              <Element />
            </ReqireAuth>
          }
        ></Route>
      ))}
      {authRoutes.map(({ path, Element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ReqireAuth path={path}>
              <Element />
            </ReqireAuth>
          }
        ></Route>
      ))}
      <Route path={"*"} element={<Navigate to={main} />}></Route>
    </Routes>
  );
};

export default PageRoutes;
