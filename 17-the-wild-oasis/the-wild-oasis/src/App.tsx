import AppRouter from "./routes/router";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {

  return <><GlobalStyles /><AppRouter /></>;
}

export default App;

/* <GlobalStyles />
      <StyledApp>
        <Row>
          <Row $layout="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button $size="small" $variation="danger">
                Check in (small + danger)
              </Button>
              <Button $size="medium" $variation="primary">
                Check out (medium + primary)
              </Button>
              <Button $size="large" $variation="secondary">
                Check out (large + secondary)
              </Button>
              <Button $size="large" $variation="primary">
                Check out (large + primary)
              </Button>
              <Button>Without props (medium + primary)</Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input placeholder="Number of guests" type="number" />
              <Input placeholder="Number of guests" type="number" />
            </form>
          </Row>
        </Row>
      </StyledApp> */
