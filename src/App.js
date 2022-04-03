import NavBar from './components/NavBar';
import StemPlayer from './components/StemPlayer';
import React, { useEffect } from 'react';
import SongCard from './components/SongCard';
import { UserProvider } from './utils/context';
import UploadModal from './components/UploadModal';
import Scrubber from './components/Scrubber';
import VolumeCluster from './components/VolumeCluster';
function App() {
    // annoying but apply the body styles to the body tag on load

    useEffect(() => {
        document.body.classList.add('h-100');
        document.body.classList.add('w-100');
        document.body.classList.add('text-center');
        document.body.classList.add('text-white');
        document.body.classList.add('bg-dark');

    }, []);

    return (
        <UserProvider>
            <UploadModal />
            <NavBar />
            <main>
                <div id="stem-container" className="py-5 container d-flex justify-content-center align-items-center">
                    <StemPlayer />
                </div>
                <div className="py-5 container">
                    <div className="row">
                        <div className="py-5 col-12">
                            <Scrubber />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-12 col-sm-6">
                            <SongCard />
                        </div>
                        <div className="col-12 col-sm-6">
                            <VolumeCluster />
                        </div>
                    </div>
                </div>
            </main>
        </UserProvider>
    );
}

export default App;