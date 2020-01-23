import React from 'react';

export default class FundTable extends React.Component {
    render() {
        return this.props.children({
            ...this.state,
            ...this.props,
        })
    }
}