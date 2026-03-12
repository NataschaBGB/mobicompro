import useHeatDevice from "../hooks/useHeatDevice";
import { heatModes } from "./HeatModeData";
import "./HeatMode.sass";



export default function HeatMode({ device }) {
    
    // mode = current mode
    // updateMode = function to update mode ind the API
    // all from the useHeatDevice hook, where we send in the device as an argument, so it can change the mode of the correct device when we call updateMode(id)
    const { mode, updateMode } = useHeatDevice(device);

    return (
        <section className="heat-mode">
            
            <h2 className="heat-mode__title">Mode</h2>
            
            <div className="heat-mode__buttons">
                {/* map through all modes from HeatModeData.js and display a button for each mode */}
                {heatModes.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        // when clicking on a button, we want to change the mode to the id of the button (manual, timed or boost)
                        // active mode gets 'active' class and changes color
                        className={`heat-mode__button ${
                        mode === id ? "heat-mode__button--active" : ""
                        }`}
                        // on click - activate updateMode, which comes from the useHeatDevice hook, and send in the id of the mode we want to change to
                        onClick={() => updateMode(id)}
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