import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/context';
import { useInterval } from '../utils/utils';

/**
 * Scrubber to show song progress. I might add it back in the program if i get
 * some time to work on it
 * @param {*} props 
 * @returns 
 */
export default function Scrubber(props) {
    const [state] = useContext(UserContext);
    const [play, setPlay] = useState(false);
    const [polling, setPolling] = useState(null);
    const [progress, setProgress] = useState(0);

    // any change in the sounds should reset everything here
    useEffect(() => {
        setProgress(0);
        setPolling(null);
        setPlay(false);
    }, [state.sounds])

    // an interval for polling while the stong is playing
    useInterval(() => {
        if (state.manager.getProgress() >= 100) {
            // clear the interval if the song is over
            setPolling(null);
            setProgress(0);
            setPlay(false);
            state.manager.stop();
        } else {
            // otherwise set the new progress
            setProgress(state.manager.getProgress());
        }
    }, polling);

    const handleClick = () => {
        if (!state.manager.isEmpty()) {
            // toggle the manager and the button
            state.manager.toggle();
            setPlay(!play);
            // start polling every 20ms
            setPolling(20);
        }
    }

    return (
        <div className="row align-items-center">
            <div className="col-3 d-grid">
                <button
                    type="button"
                    className="btn-outline-light btn"
                    onClick={handleClick}>
                    {play ? 'Pause' : 'Play'}
                </button>
            </div>
            <div className="col-9">

                <div className="progress">
                    <div
                        className="progress-bar bg-dark shadow progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    )
}