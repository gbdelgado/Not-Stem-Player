import { Howl} from 'howler';
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
        const sounds = resp.map((file) => {
            return {
                src: file.url,
                handle: file.handle,
                name: file.name
            }
        });
        return createSounds(sounds);

    } catch (e) {
        console.log(e);
        return;
    }
}

/**
 * Deletes all of our uploaded files from filestack to save space :)
 * @param {*} sounds 
 */
export function purgeSounds(sounds) {
    sounds.forEach((sound) => {
        // stop the howls from playing
        sound.howl.stop();
        fileStacker.remove(sound.handle, SECURITY_POLICY);
    })
}

/**
 * Adds the howl objects to the sounds array
 * @param {*} sounds 
 * @returns 
 */
export function createSounds(sounds) {
    // add the howls to each sound in sounds
    return sounds.map((sound) => {
        return {
            ...sound,
            howl: new Howl({
                src: [sound.src],
                html5: true
            })
        };
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