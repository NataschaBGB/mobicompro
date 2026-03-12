import useHeatMode from "../hooks/useHeatMode";
import { BsHandIndex } from "react-icons/bs";
import { PiClockLight } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";
import "./HeatMode.sass";

// Available modes: "manual", "timed", "boost" to change between
const modes = [
  { id: "manual", label: "Manuel", icon: BsHandIndex },
  { id: "timed", label: "Tidsplan", icon: PiClockLight },
  { id: "boost", label: "Boost", icon: RxRocket },
];


export default function HeatMode({ device }) {
    
    // mode = current mode
    // changeMode = function to change mode
    // all from the useHeatMode hook, where we send in the device as an argument, so it can change the mode of the correct device when we call changeMode(id)
    const { mode, changeMode } = useHeatMode(device);

    return (
        <section className="heat-mode">
            
            <h2 className="heat-mode__title">Mode</h2>
            
            <div className="heat-mode__buttons">
                {/* map through all modes and display a button for each mode */}
                {modes.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    // when clicking on a button, we want to change the mode to the id of the button (manual, timed or boost)
                    // active mode gets 'active' class and changes color
                    className={`heat-mode__button ${
                    mode === id ? "heat-mode__button--active" : ""
                    }`}
                    // on click - activate changeMode, which comes from the useHeatMode hook, and send in the id of the mode we want to change to
                    onClick={() => changeMode(id)}
                >
                    {/* icon matching the id */}
                    <Icon className="icon" />
                    {/* label matching the id */}
                    {label}
                </button>
                ))}
            </div>

        </section>
    );

}