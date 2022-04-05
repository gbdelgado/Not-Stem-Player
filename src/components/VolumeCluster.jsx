import React from 'react';
import VolumeSlider from './VolumeSlider';

export default function VolumeCluster(props) {


    return (
        <div className="container">
            <div className="row row-cols-1">
                <div className="col">
                    <VolumeSlider idx={0} sliderName="Stem 1"/>
                </div>
                <div className="col">
                    <VolumeSlider idx={1} sliderName="Stem 2"/>
                </div>
                <div className="col">
                    <VolumeSlider idx={2} sliderName="Stem 3"/>
                </div>
                <div className="col">
                    <VolumeSlider idx={3} sliderName="Stem 4"/>
                </div>
            </div>
        </div>
    )

}
