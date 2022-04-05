import { purgeSounds } from "./utils";

export const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modal: !state.modal
            }
        case 'SET_SOUNDS':
            // set the state with the new sounds and the modal to false
            // also well call the songname the first name of the file uploaded
            return {
                ...state,
                modal: false,
                sounds: action.payload.sounds,
                songName: action.payload.sounds[0].name,
                manager: action.payload.manager
            };

        default:
            return state;
    }
}

export const initialState = {
    songName: "No Song Selected",
    modal: false,
    sounds: [],
    manager: null
}