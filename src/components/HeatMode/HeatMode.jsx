import { heatModes } from "./HeatModeData";
import "./HeatMode.sass";


export default function HeatMode({ hook }) {

    // mode = current mode of the device (e.g., "off", "heat", "cool"), which is passed down from the parent component (Heat.jsx) through the hook.
    // updateMode = function that allows us to update the mode in the parent component (Heat.jsx) when the user selects a new mode.
    // hook = an object returned from the useHeatDevice custom hook, which contains the current state and functions to update the device.
    //     - We destructure mode and updateMode from this hook to use in our component.
    //     - The hook manages the logic for updating the device's mode and ensures that changes are reflected across all components that use this hook for the same device.
    const { mode, updateMode } = hook;

    return (
        <section className="heat-mode">
            
            <h2 className="heat-mode__title">Mode</h2>
            
            <div className="heat-mode__buttons">
                
                {/* map through all modes from HeatModeData.js and display a button for each mode */}
                {heatModes.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`heat-mode__button ${
                            mode === id ? "heat-mode__button--active" : ""
                        }`}
                        onClick={() => updateMode(id)}
                    >
                        <Icon className="icon" />
                        {label}
                    </button>
                ))}

            </div>
        </section>
    );

}