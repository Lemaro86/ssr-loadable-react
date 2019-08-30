import React from 'react'
import { connect } from 'react-redux';
import { fetchPages } from '../client/state/actions';
import fetchData from '../helpers/fetchData';

class FetchPage extends React.Component {
    state= {};

    render(){
        return (
            <div>SomePage</div>
        )
    }
}

const fetchPagesHoc = ({ dispatch }) => dispatch(fetchPages());

export default fetchData(fetchPagesHoc)(connect(null,
    { fetchPages })(FetchPage));
