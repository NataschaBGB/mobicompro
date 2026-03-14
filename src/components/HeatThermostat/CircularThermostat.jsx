import { useState, useRef } from "react";


// This component renders an interactive circular thermostat.

// The user can drag a small knob along the bottom half of a circle to select a temperature.

// The selected temperature is shown in the center of the thermostat and is also sent back to the parent component when the user releases the knob.

export default function CircularThermostat({ initialTemp = 15, updateTargetTemp }) {

    // temp = the temperature currently selected on the thermostat.
    // We store it in React state so the UI automatically updates whenever the user drags the knob.
    const [temp, setTemp] = useState(initialTemp);


    // containerRef stores a reference to the outer HTML element that contains the thermostat.

    // We need this so we can measure where the user clicks or touches relative to the slider on the screen.
    const containerRef = useRef(null);

    // These values define the size and structure of the circular slider.
    // Distance from the center of the circle to the track
    const radius = 110;
    // Thickness of the circular track line
    const strokeWidth = 15;

    // The center point of the circle.
    // Because SVG positions are calculated from the top-left corner, we offset the center so everything lines up correctly.
    const center = radius + strokeWidth;

    // This function runs whenever the user presses or drags the knob with either a mouse or a finger.
    // Its job is to convert the pointer position on the screen into a temperature value.
    const handlePointer = (clientX, clientY) => {

        // If the container element isn't available yet, stop.
        if (!containerRef.current) return;

        // Get the position and size of the thermostat element relative to the browser window.
        const rect = containerRef.current.getBoundingClientRect();

        // Convert the pointer position into coordinates relative to the center of the circular slider.
        const x = clientX - rect.left - center;
        const y = center - (clientY - rect.top);

        // If the pointer is above the center line (y < 0), we ignore it because the slider only responds to the top half of the circle.
        if (y < 0) return;

        // Convert the x/y position into an angle.
        // This uses trigonometry (atan2) to determine where the pointer sits along the circular track.
        let angle = Math.atan2(y, x);

        // Flip the angle so it matches the visual direction of the thermostat.
        angle = Math.PI - angle;

        // Limit movement to the bottom half of the circle.
        // This prevents the knob from moving into the top half where the slider is not visible.
        if (angle < 0) angle = 0;
        if (angle > Math.PI) angle = Math.PI;

        // Convert the angle into a temperature value.
        // - 0 radians = 0°C
        // - π radians = 30°C
        const newTemp = (angle / Math.PI) * 30;
        
        // Update the state with the new temperature, which will automatically update the UI.
        setTemp(newTemp);
    };

    // This runs when the user stops dragging.
    // At this moment we notify the parent component about the selected temperature.
    const handlePointerUp = () => {
        updateTargetTemp(Math.round(temp));
    };

    // Now we convert the temperature back into a position on the circular slider.
    // This determines where the knob should be drawn.

    // Convert temperature to an angle
    const angle = (temp / 30) * Math.PI;

    // Flip the angle to match the visual orientation
    const angleFlipped = Math.PI - angle;

    // Use cosine and sine to calculate the exact X/Y coordinates on the circle where the knob should appear.
    const thumbX = center + radius * Math.cos(angleFlipped);
    const thumbY = center - radius * Math.sin(angleFlipped);


    return (
        <div 
            className="heat-thermostat__slider"
            ref={containerRef}
        >
            <svg>
                {/* TRACK (the circular path the knob moves along) */}
                <defs>
                    {/* 
                    This filter adds a subtle inner shadow
                    to give the slider a slightly recessed look.
                    */}
                    <filter id="inset-shadow">
                        <feFlood floodColor="lightgrey"/>
                        <feComposite operator="out" in2="SourceGraphic"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite operator="atop" in2="SourceGraphic"/>
                    </filter>
                </defs>

                <defs>
                    {/* 
                    This clipPath hides the bottom half of the circle,
                    so the thermostat appears as a half-circle slider.
                    */}
                    <clipPath id="bottom-half">
                        <rect x="0" y="0" width="250" height="125" />
                    </clipPath>
                </defs>

                {/* Background track (bottom half) */}
                <circle
                    cx={center} cy={center} r="110"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="20"
                    strokeLinecap="round"
                    filter="url(#inset-shadow)"
                />

                {/* Visible slider track (top half) */}
                <circle
                    cx={center} cy={center} r="110"
                    fill="none"
                    stroke="#1d4a8f"
                    strokeWidth="20"
                    strokeLinecap="round"
                    clipPath="url(#bottom-half)"
                />

                {/* Draggable knob */}
                <circle 
                    onPointerDown={(e) => {
                        e.target.setPointerCapture(e.pointerId);
                        handlePointer(e.clientX, e.clientY);
                    }}

                    onPointerMove={(e) => {
                        if (e.buttons === 1) {
                            handlePointer(e.clientX, e.clientY);
                        }
                    }}

                    onPointerUp={(e) => {
                        e.target.releasePointerCapture(e.pointerId);
                        handlePointerUp();
                    }}

                    // Position of the knob
                    cx={thumbX} 
                    cy={thumbY}

                    // Styling
                    r={15}
                    fill="#fff"
                    stroke="#1d4a8f"
                    strokeWidth={4}
                />
            </svg>

            {/* Center display of degrees */}
            <div className="heat-thermostat__value">
                <p>{Math.round(temp)}°C</p>
                <p>Termostat</p>
            </div>
        </div>
    );
}