import React from 'react';

export default class Menu extends React.Component {
    render() {
        return this.props.children({
            ...this.state,
            ...this.props,
        })
    }
}