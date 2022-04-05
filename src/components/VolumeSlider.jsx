import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/context';

/**
 * Simple Volume slider component.
 * @param {*} props 
 * @returns 
 */
export default function VolumeSlider(props) {
    const [state] = useContext(UserContext);
    const [volume, setVolume] = useState(1);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // check to see if the sound is actually loaded
        if(!state.sounds[props.idx]) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [state.sounds]);

    /**
     * sets the the value of the volume slider visually as well as tells
     * the sound manager too aswell. the min is -70dB and the max is 0dB
     * because digital sound is wack
     * @param {UIEvent} e 
     */
    const handleChange = (e) => {
        setVolume(e.target.value);
        // tell the manager to update this track
        state.manager.setVolume(props.idx, e.target.value);
    }
    
    return (
        <div className="row gx-auto">
            <div className="col-6 align-items-start">
                <input
                    id={props.sliderName}
                    className='volume-slider'
                    orient="vertical"
                    type="range"
                    min="-70"
                    max="0"
                    step="5"
                    value={volume}
                    disabled={disabled}
                    onChange={handleChange} />
            </div>
            <div className="col-6 align-items-end">
                <label htmlFor={props.sliderName} className="form-label px-4">{props.sliderName}</label>
            </div>
        </div>
    )
}
