import React, { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context';

export default function NavBar(props) {
    const [state, dispatch] = useContext(UserContext);

    const handleClick = () => {
        dispatch({ type: 'TOGGLE_MODAL' });
    }

    return (
        <header>
            <nav className="py-3 px-4 navbar sticky-top">
                <div className="container-fluid">
                    <div className="float-md-start ">
                        <a role="button" className="btn btn-outline-light custom" href="https://github.com/gbdelgado/Not-Stem-Player">
                            <h3>
                                Not Stem Player

                            </h3>
                        </a>
                    </div>
                    <button
                        type="button"
                        className="float-md-left btn btn-outline-light"
                        onClick={handleClick}>
                        <h3>Upload</h3>
                    </button>
                </div>
            </nav>
        </header>
    )
}