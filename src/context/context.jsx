import { createContext, useState } from "react";

export const contexto = createContext("");

export const Context = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [permanecerConectado, setPermanecerConectado] = useState(false);

  return (
    <contexto.Provider
      value={{
        userInfo,
        setUserInfo,
        permanecerConectado,
        setPermanecerConectado,
      }}
    >
      {props.children}
    </contexto.Provider>
  );
};
