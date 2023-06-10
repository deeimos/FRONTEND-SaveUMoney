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
        <S.Sidebar>
          <S.Item>
            <Link to={paths.review}>SaveUMoney</Link>
          </S.Item>
          <S.Item>
            <Link to={paths.review}>Обзор</Link>
          </S.Item>
          <S.Item>
            <Link to={paths.bills}>Счета</Link>
          </S.Item>
          <S.Item>
            <Link to={paths.incomes}>Доходы</Link>
          </S.Item>
          <S.Item>
            <Link to={paths.expenses}>Расходы</Link>
          </S.Item>
        </S.Sidebar>
        <S.Logout onClick={handleClick}>Выйти</S.Logout>
      </S.Body>
      <Outlet />
    </>
  );
};

export default SideBar;
