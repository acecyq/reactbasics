import actionTypes from './Action';

const startState = {
    // table is an empty array
    table : [],
    criteria : "username",
    error : false
}

export default (state = startState, action) => {
    switch (action.type) {
        case actionTypes.getUser:
            return {
                ...state,
                table: action.data
            };
        case actionTypes.raiseError:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.sortClick:
            return {
                ...state,
                criteria: action.att
            }
        default:
            return state;
    }
}