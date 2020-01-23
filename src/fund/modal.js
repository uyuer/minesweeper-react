import React from 'react';

export default class Modal extends React.Component {
    render() {
        return this.props.children({
            ...this.state,
            ...this.props,
        })
    }
}