/* eslint-disable one-var */
// project imports

// action - state management
import * as actionTypes from './actions';

// Placeholder imports
import defaultUserAvatarRound from 'assets/images/users/user-round.svg';

export const initialState = {
    titleLong: '',
    titleShort: '',
    name: '',
    imageRound: defaultUserAvatarRound
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    let titleLong, titleShort, name;
    switch (action.type) {
        case actionTypes.SET_USER:
            titleLong = action.titleLong;
            return {
                ...state,
                titleLong,
                titleShort,
                name
            };
        default:
            return state;
    }
};

export default userReducer;
