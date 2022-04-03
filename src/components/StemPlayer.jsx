
export default function StemPlayer(props) {

    return (
        <svg id="stem_player_container" viewBox="0 0 348 348" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="stem_player">
                <circle id="base" cx="174" cy="174" r="174" fill="#A48F85" />
                <circle id="pause" cx="174" cy="174" r="11" fill="#C4C4C4" />
                <rect id="stem_three" x="11" y="153" width="127" height="43" rx="21.5" fill='#C4C4C4' />
                <rect id="stem_one" x="210" y="153" width="127" height="43" rx="21.5" fill='#C4C4C4' />
                <rect id="stem_four" x="153" y="337" width="127" height="43" rx="21.5" transform="rotate(-90 153 337)" fill='#C4C4C4' />
                <rect id="stem_two" x="153" y="138" width="127" height="43" rx="21.5" transform="rotate(-90 153 138)" fill='#C4C4C4' />
            </g>
        </svg>
    )
}