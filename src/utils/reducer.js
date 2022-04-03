import { purgeSounds } from "./utils";

export const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modal: !state.modal
            }
        case 'SET_SOUNDS':
            // first check if we need to purge any sounds from filestacker
            if(state.sounds.length > 0) {
                purgeSounds(state.sounds);
            }
            // set the state with the new sounds and the modal to false
            // also well call the songname the first name of the file uploaded
            return {
                ...state,
                modal: false,
                sounds: action.payload,
                songName: action.payload[0].name,
            };

        default:
            return state;
    }
}

export const initialState = {
    songName: "No Song Selected",
    modal: false,
    sounds: []
}