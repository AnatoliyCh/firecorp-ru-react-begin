import React, { Component, Fragment } from 'react';

export class  ButtonStandart extends Component {

    render() {
        return (
            <button
                type="submit"
                className={this.props.style}
            > {this.props.inscription}
            </button>
        )
    }
}