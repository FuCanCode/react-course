import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./SideBar";

const AppContainer = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

export default function AppLayout() {
  return (
    <AppContainer>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppContainer>
  );
}
