import React, { useState } from "react";
import { Registration, Login } from "../../components/auth/index";
import { localization } from "../../localization";
import { S } from "./styled";

export const Auth = () => {
  const [isRegistred, setIsRegistred] = useState(false);
  return (
    <S.Body>
      {isRegistred ? (
        <S.RegContent>
          <Registration/>
          <p>{localization.auth.isRegistred}</p>
          <S.Button onClick={() => setIsRegistred(!isRegistred)}>{localization.auth.buttonLogin}</S.Button>
        </S.RegContent>
      ) : (
        <S.LoginContent>
          <Login />
          <p>{localization.auth.isNotRegisted}</p>
          <S.Button onClick={() => setIsRegistred(!isRegistred)}>
            {localization.auth.buttonRegister}
          </S.Button>
        </S.LoginContent>
      )}
    </S.Body>
  );
};
