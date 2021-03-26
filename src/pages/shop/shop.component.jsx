import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
//HOC
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
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
    const { match, isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
