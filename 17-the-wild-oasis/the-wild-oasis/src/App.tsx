import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/router";
import { GlobalStyles } from "./styles/GlobalStyles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700",
            },
          }}
        />
        <GlobalStyles />
        <AppRouter />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
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
