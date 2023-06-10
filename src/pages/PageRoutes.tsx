import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { auth, review } from "../const/paths";
import { observer } from "mobx-react-lite";
import { useStores } from "../StoresProvider";
import { SideBar } from "../components/sidebar/Sidebar";

const PageRoutes = observer(() => {
  const { userStore } = useStores();
  userStore.CheckAuth();
  return (
    <Routes>
      {!userStore.IsAuth &&
        publicRoutes.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />}></Route>
        ))}
      <Route key={"/"} path="/" element={<SideBar />}>
        <Route path={"*"} element={<Navigate to={review} />}></Route>
        {userStore.IsAuth &&
          authRoutes.map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />}></Route>
          ))}
      </Route>
      {/* {userStore.IsAuth && (
        <Route path={"*"} element={<Navigate to={review} />}></Route>
      )} */}
      {!userStore.IsAuth && (
        <Route path={"*"} element={<Navigate to={auth} />}></Route>
      )}
    </Routes>
  );
});

export default PageRoutes;
