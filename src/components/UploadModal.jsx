import React, { useContext, createRef, useState } from 'react';
import { UserContext } from '../utils/context';
import { readFile } from '../utils/utils';


export default function UploadModal(props) {
    const [state, dispatch] = useContext(UserContext);
    // when the files are uploading
    const [loading, setLoading] = useState(false);
    const [error, showError] = useState(null);
    // ref to get the input files
    const inputRef = createRef(null);

    /**
     * Function is called to toggle the modal either by the or uploading
     */
    const handleClose = () => {
        dispatch({ type: 'TOGGLE_MODAL' });
    }

    /**
     * Uploads the files to the server and sets the state for on upload,
     * closing the modal, setting sounds, and song name
     * @param {Event} e 
     */
    const handleFileUpload = async (e) => {
        if (inputRef.current) {
            // can only upload a max of four or less files
            if (inputRef.current.files.length > 4) {
                showError({
                    message: 'You can only upload a max of four files at a time'
                });
            } else if (inputRef.current.files.length > 0) {
                // check to make sure all the files are audio
                for (let file of inputRef.current.files) {
                    if (!file.type.includes('audio')) {
                        showError({
                            message: 'You can only upload audio files'
                        });
                        return;
                    }
                }
                // clears an error if there was one
                showError(null);
                // set the state to loading
                setLoading(true);
                const sounds = [];

                for (let file of inputRef.current.files) {
                    const src = await readFile(file);
                    sounds.push({
                        name: file.name,
                        src
                    });
                };

                state.manager.loadTracks(sounds);

                dispatch({ type: 'SET_SOUNDS', payload: { sounds } });
                setLoading(false);
            }
        } else {
            console.log('tf ??');
        }
    }

    return state.modal && (
        <div className="modal modal-sheet position-static d-block py-5" tabIndex="-1" role="dialog" id="modalSheet">
            <div className="modal-dialog bg-dark" role="document">
                <div className="modal-content bg-dark rounded-6 shadow">
                    <div className="modal-header border-bottom-0">
                        <h5 className="modal-title">Upload Stem Files</h5>
                        <button
                            type="button"
                            className="btn-close bg-light"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}></button>
                    </div>
                    <div className="modal-body py-0">
                        {error && <div className="alert alert-warning" role="alert">
                            {error.message}
                        </div>}
                        <input ref={inputRef} className="form-control" type="file" id="file-input" multiple />
                    </div>
                    <div className="modal-footer flex-column border-top-0">
                        <button
                            type="button"
                            className="btn btn-lg btn-outline-light w-100 mx-0 mb-2"
                            onClick={handleFileUpload}
                            disabled={loading}>Upload
                            {loading && <span className="spinner-border px-2 spinner-border-sm" role="status" aria-hidden="true"></span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}