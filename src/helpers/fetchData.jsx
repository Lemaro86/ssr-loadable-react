/*global __SERVER__*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { push } from '../client/state/reducers/dataFetch';

const mapStateToProps = (state) => {
  const isDataFetchEnabled = state.dataFetch.isDataFetchEnabled;
  return { isDataFetchEnabled };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    push: bindActionCreators(push, dispatch)
  };
};

const fetchData = fetch => {
  return WrappedComponent => {
    class DataLoader extends Component {
      constructor(props) {
        super(props);
        const {dispatch, isDataFetchEnabled, push } = props;
        if (__SERVER__) {
          push(fetch({ dispatch, match: props.match }));
        } else if (isDataFetchEnabled){
          fetch({ dispatch, match: props.match });
        }
      }

      render() {
        return <WrappedComponent />;
      }
    }
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(DataLoader));
  };
};

export default fetchData;
