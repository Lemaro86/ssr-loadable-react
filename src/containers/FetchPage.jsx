import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { apiPages } from '../client/state/actions';
import fetchData from '../helpers/fetchData';

class FetchPage extends React.Component {
    state = {};

    getCurrent = (list) => {
        const arr = list.pages?.filter(e => e.id === this.props.match.params.id);
        return arr[0];
    };

    render(){
        const { fetchPages } = this.props;
        const current = fetchPages?.pages && this.getCurrent(fetchPages);
        //console.log('--------------fetch-----', fetchPages);
        return (
            <center>
                {current && <h1>{current.title}</h1>}
                {current && <b>{current.text}</b>}
                <br />

                <i>Async Page fetch from json</i>
            </center>
        )
    }
}

const mapStateToProps = state => ({ fetchPages: state.fetchPages });

const fetchPagesHoc = ({ dispatch }) => dispatch(apiPages());

export default fetchData(fetchPagesHoc)(withRouter(connect(
    mapStateToProps,
    { apiPages })(FetchPage)));
