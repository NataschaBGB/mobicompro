import { useState, useRef, useEffect } from "react";

export default function CircularThermostat({ initialTemp = 20, onChangeEnd }) {

    const min = 0;
    const max = 30;
    const size = 220;
    const stroke = 18;
    const radius = (size - stroke) / 2;
    const center = size / 2;

    const [temp, setTemp] = useState(initialTemp);
    const dragging = useRef(false);

    const angleFromTemp = (t) => (t - min) / (max - min) * 270 - 135;
    const tempFromAngle = (angle) => {
        const normalized = (angle + 135) / 270;
        const value = min + normalized * (max - min);
        return Math.round(Math.max(min, Math.min(max, value)));
    };

    const polarToCartesian = (angle) => {
        const rad = angle * Math.PI / 180;
        return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
    };

    const updateFromEvent = (e) => {
        let clientX, clientY;

        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const rect = document.querySelector(".thermostat-svg").getBoundingClientRect();
        const x = clientX - rect.left - center;
        const y = clientY - rect.top - center;

        const angle = Math.atan2(y, x) * 180 / Math.PI;
        const value = tempFromAngle(angle);
        setTemp(value);
    };

    useEffect(() => {
        const handleMove = (e) => { if (dragging.current) updateFromEvent(e); };
        const handleUp = () => { if (dragging.current) { dragging.current = false; onChangeEnd?.(temp); } };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [temp]);

    const angle = angleFromTemp(temp);
    const knob = polarToCartesian(angle);
    const circumference = 2 * Math.PI * radius;
    
    return (
        <svg
            className="thermostat-svg"
            width={size}
            height={size}
            onMouseDown={(e) => { dragging.current = true; updateFromEvent(e); }}
            onTouchStart={(e) => { dragging.current = true; updateFromEvent(e); }}
            style={{ cursor: "pointer", display: "block", margin: "auto" }}
        >
            <circle cx={center} cy={center} r={radius} stroke="#e5e5e5" strokeWidth={stroke} fill="none" />
            <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#1d4a8f"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - (temp - min)/(max - min))}
                transform={`rotate(-135 ${center} ${center})`}
                strokeLinecap="round"
            />
            <circle cx={knob.x} cy={knob.y} r="12" fill="#fff" stroke="#1d4a8f" strokeWidth="4" />
            <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                fontSize="38" fontWeight="600" fill="#333"
            >
                {temp}°C
            </text>
        </svg>
    );
}