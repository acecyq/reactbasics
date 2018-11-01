import actionTypes from './Action';

const startState = {
    // table is an empty array
    table : [],
    criteria : "username",
    error : false,
    apiCancel: {
        'users': {},
        'posts': {},
        'comments': {}
    }
};

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
            };
        case actionTypes.addUrl:
            let { location, url, source } = action;
            return {
                ...state,
                apiCancel: {
                    ...state.apiCancel,
                    [location]: {
                        ...state.apiCancel[location],
                        [url]: source
                    }
                }
            };
        case actionTypes.remUrl:
            return {
                ...state,
                table: []
            };
        default:
            return state;
    }
}