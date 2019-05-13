import { LOGOUT, TOGGLE_MODAL, CHECK_ADMIN, SET_ORDER, CREATE_USER, GET_ORDERS, UPDATE_LOCATION, TOGGLE_THEME } from './actionTypes';
import * as firebase from 'firebase';

export const logOut = () => {
    try {
        firebase.auth().signOut();
    } catch (err) {
        console.log(err);
    }
    return {
        type: LOGOUT
    }
};

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
}

export const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    }
}

export const checkIfAdmin = () => {
    const { currentUser } = firebase.auth();
    let uid = currentUser.uid;
    
    return dispatch => {
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
            if(snapshot.exists()) {
                let admin = snapshot.val().admin || false;
                dispatch({ type: CHECK_ADMIN, admin });
            } else {
                dispatch(createUser());
            }
        })
    }
}


export const getOrders = isAdmin => {
    const { currentUser } = firebase.auth();
    let { email } = currentUser.providerData[0];

    return dispatch => {
        firebase.database().ref(`orders`).on('value', snapshot => {
            let orders = [];
            // check if orders exists
            if(snapshot.exists()){
                snapshot.forEach(childSnapshot => {
                    if(isAdmin) {
                        if(childSnapshot.val().from === email) {
                            orders.push(childSnapshot.val());
                        }
                    } else {
                        if(childSnapshot.val().email === email) {
                            orders.push(childSnapshot.val());
                        }
                    }
                })
                // orders sorting
                let sortedOrders = orders.sort((a,b) => {
                    return b.date < a.date ? -1 : b.date > a.date ? 1 : 0
                });
                dispatch({ type: GET_ORDERS, payload: sortedOrders });
            }
        })
    }
}

export const setOrder = order => {
    const { oid } = order;
    return dispatch => {
        firebase.database().ref(`orders/${oid}`).on('value', snapshot => {
            let selectedOrder = snapshot.val();
            dispatch({ type: SET_ORDER, payload: selectedOrder });
        })
    }
}

export const createUser = () => {
    const { currentUser } = firebase.auth();
    let { email } = currentUser.providerData[0];
    let { uid } = currentUser;
    let created = new Date().toISOString();

    return dispatch => {
        firebase.database().ref(`users/${uid}`).set({
            email: email,
            created: created.toString(),
        })
        dispatch({ type: CREATE_USER });
    }
}

export const updateLocation = location => {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}