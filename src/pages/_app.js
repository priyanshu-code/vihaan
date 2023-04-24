import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store";
import { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
