import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Table from '../table/table';
import Spinner from '../../ui/spinner/spinner';
import Heading from '../../ui/heading/heading';
import Root from '../root/root';

export default class extends Component {
    state = {
        data : null,
        criteria : null
    }

    componentDidMount() {

        // get index from this.props.match.params
        // send get request for the comments pertaining to the post with id of index
        axios.get(`/posts/${this.props.match.params.id}/comments`)
            .then(res => {
                this.setState({ data : res.data })
            })
            .catch(err => err);
    }

    headingClick = (att) => {
        this.setState({ criteria : att });
    }

    render() {
        const content = this.state.data ?
            <Fragment>
                <Heading value="Comments" />
                <Table 
                    data={this.state.data} 
                    criteria={this.state.criteria}
                    click={this.headingClick}
                />
            </Fragment>
             :
            <Spinner />;

        return (
            <Fragment>
                {content}
                <Root />
            </Fragment>
        );
    }
}
    
