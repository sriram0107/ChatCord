import React from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CreateStore } from "./redux/CreateStore";

const store = CreateStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
