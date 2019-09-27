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

    renderMenu = (pages) => {
        return pages?.map((e) => (
            <div key={e.id}><Link to={`/pageFetch/${e.id}`}> Page: {e.id} </Link></div>
        ))
    };

    render() {
        const { fetchPages } = this.props;
        const current = fetchPages?.pages && this.getCurrent(fetchPages);
        return (
            <div>
                {fetchPages?.pages && this.renderMenu(fetchPages.pages)}
                <center>
                    {current && <h1>{current.title}</h1>}
                    {current && <b>{current.text}</b>}
                    <br />

                    <i>Async Page fetch from json</i>
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => ({ fetchPages: state.fetchPages });

const fetchPagesHoc = ({ dispatch }) => dispatch(apiPages());

export default fetchData(fetchPagesHoc)(withRouter(connect(
    mapStateToProps,
    { apiPages })(FetchPage)));
