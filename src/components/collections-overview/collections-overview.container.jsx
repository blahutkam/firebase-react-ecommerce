import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
    //gives us boolean value which we use when data is already fetched
    //but page is reloaded, to avoid error "cannot destructore property"
});

const CollectionsOverviewContainer = compose(
connect(mapStateToProps),
WithSpinner
)(CollectionsOverview);

//same as
//const CollectionsOverviewContainer = connect(mapStateTopProps)(WithSpinner(CollectionsOverview))

export default CollectionsOverviewContainer;