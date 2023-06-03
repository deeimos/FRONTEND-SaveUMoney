import React from "react";
import { S } from "./styled";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStores } from "../../StoresProvider";
import * as paths from "../../const/paths";

export const SideBar = () => {
  const { userStore } = useStores();
  const navigate = useNavigate();

  const handleClick = () => {
    userStore.LogOut();
    navigate(paths.auth);
  };
  return (
    <>
      <S.Body>
        <Link to={paths.main}>1</Link>
        <Link to={paths.bills}>2</Link>
        <Link to={paths.incomes}>3</Link>
        <Link to={paths.expenses}>4</Link>
        <button onClick={handleClick}>Log out</button>
      </S.Body>
      <Outlet />
    </>
  );
};

export default SideBar;
