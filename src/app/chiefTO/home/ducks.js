export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED';
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED';
export const DECREMENT = 'counter/DECREMENT';
export const LOG = 'LOG';

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  pos: "pitch"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      };
    case LOG:
      return {
        ...state,
        pos: action.pos
      };
    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
};

export const log = event => {
  return dispatch => {
    dispatch({
      type: LOG,
      pos: event.target.value
    })
  }
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
};

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    });

    dispatch({
      type: DECREMENT
    })
  }
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
};
