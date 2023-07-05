import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from './Auxiliares/GlobalStyles';
import Account from './components/Account/Account';
import EditIncomeStatement from './components/EditStatement/EditIncomeStatement';
import EditExpenseStatement from './components/EditStatement/EditExpenseStatement';
import NewIncome from './components/NewIncome/NewStatement';
import NewOutcome from './components/NewOutcome/NewStatement';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { Context } from "./context/context";

function App() {
  return (
    <Screen>
      <Context>
        <GlobalStyle />
        <SmartPhoneContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/cadastro" element={<SignUp />} />
              <Route path="/home" element={<Account />} />
              <Route path="/nova-transacao/entrada" element={<NewIncome />} />
              <Route path="/nova-transacao/saida" element={<NewOutcome />} />
              <Route path="/editar-registro/entrada/:id" element={<EditIncomeStatement />} />
              <Route path="/editar-registro/saida/:id" element={<EditExpenseStatement />} />
            </Routes>
          </BrowserRouter>
        </SmartPhoneContainer>
      </Context>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, violet, blue);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

const SmartPhoneContainer = styled.div`
  width: 400px;
  height: 85vh;
  background-color: ${(props) => (props.noturno ? '#1C1C1C' : '#e5e5e5')};
  box-sizing: border-box;
  overflow: scroll;
  position: relative;
  border-radius: 30px;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media (max-width: 600px) {
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }
`;

export default App;
