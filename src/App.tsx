import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="underline">
        <ProductList />
      </div>
    </MantineProvider>
  );
}
