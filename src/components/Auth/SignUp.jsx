import styled from "styled-components";
import { useState } from "react";
import { urlSignUp } from "../../Auxiliares/constants";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { carregamento } from "../../Auxiliares/constants";

let tempoMs;

export default function SignUp(params) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  tempoMs = 400;

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const login = axios.post(urlSignUp, {
      email: email,
      name: nome,
      repeatPassword: repeatPassword,
      password: password,
    });
    login.then(() => navigate("/"));
    login.catch(({ response }) => {
      if (response.status === 409) {
        alert("Usuário já existe!");
      } else {
        alert("Erro desconhecido!");
      }
      setLoading(false);
    });
  }

  return (
    <CadastroContainer>
      <div>MyWallet</div>
      {!loading ? (
        <>
          <form action="/hoje" onSubmit={handleSubmit}>
            <input
              data-test="name"
              name="name"
              type="name"
              placeholder="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              data-test="email"
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              data-test="password"
              name="password"
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              data-test="conf-password"
              name="password"
              type="password"
              placeholder="Confirme a senha"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button data-test="sign-up-submit">Cadastrar</button>
          </form>
          <Link to="/">
            <p>Já tem uma conta? Entre agora!</p>
          </Link>
        </>
      ) : (
        <>
          <form action="/hoje" onSubmit={handleSubmit}>
            <input
              data-test="name"
              name="name"
              type="name"
              placeholder="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled
            />
            <input
              data-test="email"
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <input
              data-test="password"
              name="password"
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
            <input
              data-test="conf-password"
              name="password"
              type="password"
              placeholder="Confirme a senha"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled
            />
            <button data-test="sign-up-submit" disabled>
              {carregamento}
            </button>
          </form>
          <Link to="/">
            <p>Já tem uma conta? Entre agora!</p>
          </Link>
        </>
      )}
    </CadastroContainer>
  );
}

function tempo() {
  tempoMs += 50;
  return tempoMs + "ms";
}

export const CadastroContainer = styled.div`
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
  }
`;
