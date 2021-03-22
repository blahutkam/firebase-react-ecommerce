import { createSelector } from "reselect";
import collectionsOverviewComponent from "../../components/collections-overview/collections-overview.component";

// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15175872#overview

//1
//we wrote this object, where string value goes to the id
//because url parameter is a string,
//but id we want to march is a number
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneaker: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

//2
//then we map over collections by selecting it
//and passing into our new select collection selector - the url parameters (string)
// and we return create selector (function that returns another function)
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) =>
      //part of data normalization process shop.data array => object
      //we dont need COLLECTION_ID_MAP anymore

      //collections.find(
      // (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
      collections[collectionUrlParam]
  );
