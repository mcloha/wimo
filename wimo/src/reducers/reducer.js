const initialState = {
    isToggled: false,
    isAdmin: false,
    orders: [],
    selectedOrder: null,
    location: null,
    darkTheme: false
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGOUT':
            return {};
        case 'TOGGLE_MODAL':
            return {...state, isToggled: !state.isToggled};
        case 'CHECK_ADMIN':
            return { ...state, isAdmin: action.admin };
        case 'CREATE_USER':
            return { ...state };
        case 'GET_ORDERS':
            return {...state, orders: action.payload};
        case 'SET_ORDER':
            return {...state, isToggled: false, selectedOrder: action.payload};
        case 'UPDATE_LOCATION':
            return { ...state, location: action.payload };
        case 'TOGGLE_THEME':
            return { ...state, darkTheme: !state.darkTheme, isToggled: false };
        default:
            return state;
    }
}

export default reducer;