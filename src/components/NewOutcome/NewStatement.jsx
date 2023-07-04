import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { urlPostStatement } from "../../Auxiliares/constants";
import { contexto } from "../../context/context";

export default function NewStatement() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const { userInfo } = useContext(contexto);
  const navigate = useNavigate();

  function postStatement() {
    if (JSON.stringify(userInfo) === "{}") {
      return navigate("/");
    }
    axios
      .post(
        urlPostStatement,
        {
          value: value,
          description: description,
          operation: "debits",
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      )
      .then((response) => {
        return navigate("/home");
      })
      .catch((response) => {
        console.error(response);
        alert("Algo deu errado!");
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    postStatement();
  }

  return (
    <NewStatementContainer>
      <h1>Nova saída</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="value"
          type="number"
          data-test="registry-amount-input"
          placeholder="Valor ex.: 3500,50"
          max={9999999999.9999999999}
          min={0.0}
          value={value}
          step={0.01}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          name="text"
          type="text"
          data-test="registry-name-input"
          placeholder="Descrição ex.: Presente da mamãe"
          value={description}
          maxLength="30"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button data-test="registry-save">Salvar saída</button>
      </form>
    </NewStatementContainer>
  );
}

const NewStatementContainer = styled.div`
  background-color: #8c11be;
  padding: 25px 25px;
  height: 100%;
  box-sizing: border-box;
  h1 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: white;
    margin-bottom: 40px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      font-size: 20px;
      width: 100%;
      background: #ffffff;
      border-radius: 5px;
      height: 58px;
      border: none !important;
      padding: 10px;
      box-sizing: border-box;
      outline: none;
    }
    button {
      width: 100%;
      height: 46px;
      background: #a328d6;
      border-radius: 5px;
      border: none;
      color: white;
      font-family: "Raleway";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
    }
  }
`;
