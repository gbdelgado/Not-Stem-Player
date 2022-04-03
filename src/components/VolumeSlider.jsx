import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/context';

/**
 * Simple Volume slider component.
 * @param {*} props 
 * @returns 
 */
export default function VolumeSlider(props) {
    const [state] = useContext(UserContext);
    const [volume, setVolume] = useState(1);

    /**
     * Sets the visual and howler volume. Here the prop id will bind the 
     * track to the slider. Ex. if the id is 0 this will correspond to the
     * 0th indexed track in the state.sounds array.
     * @param {Event} e 
     */
    const handleChange = (e) => {
        // set the visual volume
        setVolume(e.target.value);
        // only set the howler volume if we have a sound
        if(state.sounds[props.id]) {
            // set the actual howler volume
            state.sounds[props.id].howl.volume([e.target.value]);
        }
    }
 
    return (
        <div className="row gx-auto">
            <div className="col-6 align-items-start">
                <input
                    id={props.sliderName}
                    className='volume-slider'
                    orient="vertical"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleChange} />
            </div>
            <div className="col-6 align-items-end">
                <label htmlFor={props.sliderName} className="form-label px-4">{props.sliderName}</label>
            </div>
        </div>
    )
}
