import "./scss/main.scss";
import React, { useEffect, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import {
  auth,
  createUserProfileDocument,

  //to add collections from our app /redux to firebase
  //addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import SignIn from "./components/sign-in/sign-in.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

//to add collections from our app /redux to firebase
//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //to add collections from our app /redux to firebase
    //const { setCurrentUser, collectionsArray } = this.props;
    const { checkUserSession } = this.props;

    //repalced with saga
    // //fetch authetificated user inside component did mount
    // //it's in the top level because our app might need info about current user
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot((snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //     });
    //   }

    //   setCurrentUser(userAuth);
    //   // add collections from our app / redux to firebase
    //   // addCollectionAndDocuments(
    //   //   "collections",
    //   //   collectionsArray.map(({ title, items }) => ({ title, items }))
    //   // );
    //});

    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignIn />
            }
          />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //add collections from our app / redux to firebase
  //collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

//iffirts parameter is null because we don't need mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
