import * as Tone from 'tone';
Tone.Transport.debug = true;
/**
 * Class to manage audio synchronization
 */
export default class AudioManager {
    constructor() {
        // this will represent the actual audio buffers set in init
        this.players = [];
        // this will represent the duration of the song
        this.duration = null;
        this.tracks = [];
    }

    /**
     * This function will create all load in all of the audio bufferes
     * This must be called after construction for anything to work since constructors
     * cant be async
     */
    async init() {
        // fill in the players array with the tracks
        this.players = this.tracks.map((track) => {
            return new Tone.Player(track.src).toDestination();
        });

        // initalize the players
        this.players.forEach((player) => {
            player.sync(1).start();
            // make a note of how long ths track is
        });


        // wait for the buffers to load
        await Tone.loaded();
        await Tone.start();
        // set the duration of the song, every track SHOULD be the same length so taking the first
        this.duration = this.players[0].buffer.duration;
        console.log('Audio loaded');
    }

    /**
     * Loads in the tracks
     * @param {*[]} tracks 
     */
    async loadTracks(tracks) {
        this.stop();
        // unload all of the old tracks
        if (this.players.length > 0) {
            this.players.forEach((player) => {
                player.stop();
                player.dispose();
            })
        }

        // load in the new tracks
        this.tracks = tracks;
        await this.init();
    }

    isEmpty() {
        return this.tracks.length <= 0;
    }

    /**
     * 
     * @returns Returns the progress of the song in percent, 0-100
     */
    getProgress() {
        return (Tone.Transport.seconds / this.duration).toFixed(3) * 100;
    }

    /**
     * Stops the transport
     */
    stop() {
        Tone.Transport.stop();
    }

    /**
     * Toggles the transport on and off
     */
    toggle() {
        console.log(Tone.Transport.state);
        Tone.Transport.toggle();
    }

    /**
     * Sets the volume of the given tack
     * @param {Number} trackNumber the index of the track
     */
    setVolume(trackNumber, newVolume) {
        this.players[trackNumber].volume.value = newVolume;
    }


}