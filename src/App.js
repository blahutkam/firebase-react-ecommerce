import "./scss/main.scss";
import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignFormsPage from "./pages/sign-forms/sign-forms.component";

import Header from "./components/header/header.component";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/sign-page" component={SignFormsPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
