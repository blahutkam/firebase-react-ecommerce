import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends React.Component {
  //all fetch request in componentDidMount
  //don't set new values from state in constructor, because it causes re-render
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  //observable pattern
  //live update stream style observableble pattern lended us - using onSnapshot
  //https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15196980#announcements

  //promise pattern - REST CALLS
  //only time when we get data from backend is when we remount our shop
  //https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15197284#announcements
  //values we need are extremly nested so we're not using this pattern here
  //moved to shop.actions

  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection("collections");
  //   fetch(
  //     "https://firestore.googleapis.com/v1/projects/crwn-db-f2fd1/databases/(default)/documents/collections"
  //   )
  //     .then((response) => response.json())
  //     .then((collections) => console.log(collections));

  //   collectionRef.get().then((snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false });
  //   });
  // }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
