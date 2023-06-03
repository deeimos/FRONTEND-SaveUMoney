import React, { useState } from "react";
import { Registration, Login } from "../../components/auth/index";

export const Auth = () => {
  const [isRegistred, setIsRegistred] = useState(false);
  return (
    <>
      <h1>Auth</h1>
      {isRegistred ? (
        <div>
          <Registration/>
          <p>Уже есть аккаунт?</p>
          <button onClick={() => setIsRegistred(!isRegistred)}> Войти </button>
        </div>
      ) : (
        <div>
          <Login />
          <p>Еще нет аккаунта?</p>
          <button onClick={() => setIsRegistred(!isRegistred)}>
            Зарегистрироваться
          </button>
        </div>
      )}
    </>
  );
};
