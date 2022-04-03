import React, { useContext } from 'react';
import { UserContext } from '../utils/context';

export default function SongCard(props) {
    const [state] = useContext(UserContext);
    return (
        <div className="card song-card px-5">
            <div className="card-body">
                <h5 className="card-title">{state.songName}</h5>
            </div>
        </div>
    )
}