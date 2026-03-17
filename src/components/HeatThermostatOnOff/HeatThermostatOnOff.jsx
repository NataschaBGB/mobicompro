import { LuPower } from "react-icons/lu";
import './HeatThermostatOnOff.sass';


export default function HeatThermostatOnOff({ hook }) {

    // mode = current mode of the device (e.g., "off", "heat", "cool"), which is passed down from the parent component (Heat.jsx) through the hook.
    // toggleDevice = function that allows us to toggle the device on/off in the parent component (Heat.jsx) when the user clicks the button.
    // hook = an object returned from the useHeatDevice custom hook, which contains the current state and functions to update the device.
    //     - We destructure mode and toggleDevice from this hook to use in our component.
    //     - The hook manages the logic for toggling the device on/off and ensures that changes are reflected across all components that use this hook for the same device.
    const { mode, toggleDevice } = hook;

    return (
        <section className="heat-thermostat-on-off">
            <button
                className={`heat-thermostat-on-off__button ${
                    mode !== "off"
                        ? "heat-thermostat-on-off__button--on"
                        : "heat-thermostat-on-off__button--off"
                }`}
                onClick={toggleDevice}
            >
                <LuPower className="icon" />
            </button>
        </section>
    );
}