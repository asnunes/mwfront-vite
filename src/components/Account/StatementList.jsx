import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { contexto } from '../../context/context';

export default function StatementDetail({ statement, getStatement }) {
  const [color, setColor] = useState('');
  const { userInfo } = useContext(contexto);
  useEffect(() => {
    if (statement.type === 'debits') setColor('#C70000');
    else setColor('#03AC00');
  }, []);

  function deleteStatement(id) {
    if (window.confirm('Tem certeza?')) {
      console.log('confirmou');
      deleteAxios();
    } else {
      console.log('não confirmou');
    }

    function deleteAxios() {
      const delet = axios.delete(`${process.env.REACT_APP_API_URL}/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      delet.then(() => {
        getStatement();
      });
      delet.catch(() => {});
    }
  }

  return (
    <StatementDetailDiv color={color}>
      <div className="start">
        <h3>{statement.date}</h3>
        <Link
          to={
            statement.type === 'credits'
              ? `/editar-registro/entrada/${statement.id}`
              : `/editar-registro/saida/${statement.id}`
          }
          data-test="registry-name"
        >
          {statement.description}
        </Link>
      </div>
      <div className="final">
        <h5 data-test="registry-amount">{parseFloat(statement.value).toFixed(2).replace('.', ',')}</h5>
        <h3 data-test="registry-delete" onClick={() => deleteStatement(statement.id)}>
          X
        </h3>
      </div>
    </StatementDetailDiv>
  );
}

const StatementDetailDiv = styled.div`
  width: 100%;
  font-family: 'Raleway' !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }

  .start {
    justify-content: start !important;
    width: 70%;
  }

  .final {
    justify-content: flex-end !important;
    gap: 7px;
    align-items: center;
    max-width: 20%;
    h3 {
      font-size: 12px;
    }
  }

  h3 {
    color: #c6c6c6 !important;
  }
  a {
    color: #000000 !important;
    margin-left: 10px !important;
    max-width: 70% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  h5 {
    color: ${(props) => props.color};
    margin-left: 10px;
  }
`;
