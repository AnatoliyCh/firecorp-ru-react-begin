import React, { Component } from 'react';

export class  ButtonStandart extends Component {

    render() {
        return (
            <button
                type="submit"
                className={this.props.style}
                onClick={this.props.func}
            > {this.props.inscription}
            </button>
        )
    }
}