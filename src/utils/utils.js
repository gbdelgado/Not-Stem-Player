import AudioManager from './AudioManager';
import { useEffect, useRef } from 'react';
const fileStacker = require('filestack-js').init(process.env.REACT_APP_FILESTACK_KEY);
const SECURITY_POLICY = {
    signature: process.env.REACT_APP_FILESTACK_SIGNATURE,
    policy: process.env.REACT_APP_FILESTACK_POLICY
}

/**
 * Uploads the given files to filestack and returns the sounds state
 * @param {*} files 
 * @returns 
 */
export async function uploadFiles(files) {
    try {
        const resp = await fileStacker.multiupload(files);
        // we only care about the handles and src and filename, so lets format and
        // put them in the state
        console.log(resp);
        return resp.map((file) => {
            return {
                src: file.url,
                handle: file.handle,
                name: file.name
            }
        });

    } catch (e) {
        console.log(e);
        return;
    }
}

export async function createManager(sounds, prevManager) {
    // fire the old manager
    if(prevManager) {
        // an old manager means we also have old sounds so purge those
        purgeSounds(sounds);
        prevManager.stop();
        prevManager.dispose();
    }
    // create the audio manager
    const manager = new AudioManager(sounds);
    // load in the sounds
    await manager.init();
    // return the state with the sounds and the manager
    return manager;
}

/**
 * Deletes all of our uploaded files from filestack to save space :)
 * @param {*} sounds 
 */
export function purgeSounds(sounds) {
    sounds.forEach((sound) => {
        fileStacker.remove(sound.handle, SECURITY_POLICY);
    })
}

/**
 * lil debounce function
 * @param {} func 
 * @param {*} timeout 
 * @returns 
 */
export function debounce(func, timeout = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Creds: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}