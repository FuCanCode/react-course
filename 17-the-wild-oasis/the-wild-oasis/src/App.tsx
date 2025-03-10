import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>A Styled Heading</H1>
        <Button>Check in</Button>
        <Button>Check out</Button>
        <Input placeholder="Number of guests" type="number" />
        <div>Blub</div>
      </StyledApp>
    </>
  );
}

export default App;
