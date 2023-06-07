import React, { useState } from "react";
import { Registration, Login } from "../../components/auth/index";
import { localization } from "../../localization";

export const Auth = () => {
  const [isRegistred, setIsRegistred] = useState(false);
  return (
    <>
      {isRegistred ? (
        <div>
          <Registration/>
          <p>{localization.auth.isRegistred}</p>
          <button onClick={() => setIsRegistred(!isRegistred)}>{localization.auth.buttonLogin}</button>
        </div>
      ) : (
        <div>
          <Login />
          <p>{localization.auth.isNotRegisted}</p>
          <button onClick={() => setIsRegistred(!isRegistred)}>
            {localization.auth.buttonRegister}
          </button>
        </div>
      )}
    </>
  );
};
