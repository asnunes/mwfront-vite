import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { urlLogin } from "../../Auxiliares/constants";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { carregamento } from "../../Auxiliares/constants";
import { contexto } from "../../context/context";

let tempoMs;

export default function SignIn(params) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(contexto);
  const { permanecerConectado, setPermanecerConectado } = useContext(contexto);
  tempoMs = 400;

  useEffect(() => {
    const userInfoCopy = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfoCopy !== null) {
      setUserInfo(userInfoCopy);
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const login = axios.post(urlLogin, {
      email: email,
      password: password,
    });
    login.then((response) => {
      console.log(permanecerConectado);
      if (permanecerConectado) {
        const userInfoSerializada = JSON.stringify(response.data);
        localStorage.setItem("userInfo", userInfoSerializada);
      }
      setUserInfo(response.data);
      return navigate("/home");
    });
    login.catch((response) => {
      setLoading(false);
    });
  }

  return (
    <LoginContainer loading={loading}>
      <div>MyWallet</div>
      {!loading ? (
        <>
          <form action="/hoje" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              data-test="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name="password"
              type="password"
              data-test="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button data-test="sign-in-submit">Entrar</button>
            <label>
              Permanecer conectado?
              <input
                className="check"
                type="checkbox"
                checked={permanecerConectado}
                onChange={() => setPermanecerConectado(!permanecerConectado)}
              />
            </label>
          </form>
          <Link to="/cadastro">
            <p>Primeira vez? Cadastre-se!</p>
          </Link>
        </>
      ) : (
        <>
          <form action="" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              data-test="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <input
              name="password"
              type="password"
              data-test="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
            <button data-test="sign-in-submit" disabled>
              {carregamento}
            </button>
            <label>
              Permanecer conectado?
              <input
                disabled
                className="check"
                type="checkbox"
                value={permanecerConectado}
              />
            </label>
          </form>
          <Link to="/cadastro">
            <p>Primeira vez? Cadastre-se!</p>
          </Link>
        </>
      )}
    </LoginContainer>
  );
}

function tempo() {
  tempoMs += 50;
  return tempoMs + "ms";
}

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 30% 10%;
  box-sizing: border-box;
  background-color: ${(props) => (props.noturno ? "#1C1C1C" : "#8C11BE")};
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  div {
    font-family: "Saira Stencil One";
    margin-bottom: 25px;
    font-weight: 400;
    font-size: 32px;
    color: #ffffff;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    gap: 10px;
  }
  input {
    padding-left: 8px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    box-sizing: border-box;
    outline: none;
  }
  input.check {
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }
  label {
    font-size: 15px;
    color: gray;
  }
  input::placeholder {
    font-weight: 400;
    font-size: 20px;
    color: #dbdbdb;
    font-family: "Lexend Deca";
  }
  button {
    font-family: "Lexend Deca";
    width: 100%;
    height: 45px;
    color: white;
    background-color: #a328d6;
    border-radius: 4.63636px;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    margin-top: 25px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: white !important;
    color: #52b6ff;
  }
`;
