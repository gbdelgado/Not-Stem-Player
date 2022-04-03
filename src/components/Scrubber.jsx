import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/context';

/**
 * Scrubber to show song progress. I might add it back in the program if i get
 * some time to work on it
 * @param {*} props 
 * @returns 
 */
export default function Scrubber(props) {
    const [state] = useContext(UserContext);
    const [currInterval, setCurrInterval] = useState(null);

    const [duration, setDuration] = useState(0);
    const [place, setPlace] = useState(0);

    const checkInterval = () => {
        //also check to see if the duration has loaded
        if (duration === 0) {
            setDuration(state.sounds[0].howl.duration());
        }
        setPlace(state.sounds[0].howl.seek());
    }

    useEffect(() => {
        if (state.sounds.length > 0) {
            // start playing the new sounds
            state.sounds.forEach((sound) => sound.howl.play());
            // set any previous intervals to null
            if (currInterval) {
                clearInterval(currInterval);
            }
            // start a new interval to poll the sound duration
            setCurrInterval(setInterval(() => checkInterval(), 60));
        }
    }, [state.sounds]);


    return (
        <div className="progress">
            <div
                className="progress-bar bg-dark shadow progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={place}
                aria-valuemin="0"
                aria-valuemax={duration}
                style={{ width: `${(place / duration).toFixed(3) * 100}%` }} />
        </div>
    )
}