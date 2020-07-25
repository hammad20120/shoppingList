import React, { useEffect } from "react";

import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import store from "./store";

import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
