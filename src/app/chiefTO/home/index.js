import React, {Component} from 'react'
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    log,
} from './ducks'

class Home extends Component {
    render() {
        const props = this.props;
        return(
            <div>
                <h1>Home</h1>
                <p>Count: {props.count}</p>

                <p>
                    <button onClick={props.increment}>Increment</button>
                    <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
                        Increment Async
                    </button>
                </p>

                <p>
                    <button onClick={props.decrement}>Decrement</button>
                    <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
                        Decrement Async
                    </button>
                </p>

                <p>
                    <button onClick={() => props.changePage()}>
                        Go to about page via redux
                    </button>
                </p>
                <p>{props.pos}</p>
                <input type="text" onChange={props.log} />
            </div>
        );
    }
}

const mapStateToProps = ({counter}) => ({
    count: counter.count,
    isIncrementing: counter.isIncrementing,
    isDecrementing: counter.isDecrementing,
    pos: counter.pos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            increment,
            incrementAsync,
            decrement,
            decrementAsync,
            log,
            changePage: () => push('/about-us')
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
