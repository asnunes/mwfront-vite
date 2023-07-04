import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { contexto } from "../../context/context";
import { urlAccounts } from "../../Auxiliares/constants";

export default function EditIncomeStatement() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const { userInfo } = useContext(contexto);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(userInfo) === "{}") {
      return navigate("/");
    }

    axios
      .get(urlAccounts, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        const statement = response.data.statement;
        if (!Array.isArray(statement)) {
          return;
        }

        const currentRegistry = statement.filter((registry) => {
          return registry.id === parseInt(id);
        });

        if (currentRegistry.length > 0) {
          setValue(currentRegistry?.[0].value);
        }

        if (currentRegistry.length > 0) {
          setDescription(currentRegistry?.[0].description);
        }
      })
      .catch((response) => console.error(response));
  }, [id]);

  function putStatement() {
    if (JSON.stringify(userInfo) === "{}") {
      navigate("/");
    }

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/accounts/${id}`,
        {
          value: value,
          description: description,
          operation: "credits",
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      )
      .then(() => {
        navigate("/home");
      })
      .catch((response) => {
        console.error(response);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    putStatement();
  }

  return (
    <EditStatementContainer>
      <h1>Editar entrada</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="value"
          type="number"
          data-test="registry-amount-input"
          placeholder="Ex: 3500,50"
          max={9999999999.9999999999}
          min={0}
          step={0.01}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          name="text"
          type="text"
          data-test="registry-name-input"
          placeholder="Ex: Presente da mamãe"
          value={description}
          maxLength="30"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button data-test="registry-save">Atualizar entrada</button>
      </form>
    </EditStatementContainer>
  );
}

const EditStatementContainer = styled.div`
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
