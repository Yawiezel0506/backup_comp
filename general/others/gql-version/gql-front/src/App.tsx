import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Home from "./pages/Home";
import { themeSettings } from "./palette/theme";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { ConnectBanners } from "./utils/functionsForDB";
import NotFound from "./pages/NotFound";
import automaticLogIn from "./utils/automaticLogIn";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Charts from "./pages/Charts";

const baseUrl = import.meta.env.VITE_SERVER_API;

const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  automaticLogIn();
  ConnectBanners();
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
