import "./main.scss";
import ReactDOM from "react-dom/client";
import AppMain from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { App } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App>
          <ToastContainer position={"bottom-right"} className={"text-start"} />
          <AppMain />
        </App>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
