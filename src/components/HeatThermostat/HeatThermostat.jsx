import { PiThermometerHotLight } from "react-icons/pi";
import { IoIosCloudOutline } from "react-icons/io";
import CircularThermostat from './CircularThermostat';
import './HeatThermostat.sass';


export default function HeatThermostat({ device, weather, hook }) {

    // targetTemp = the current target temperature of the device, which is passed down from the parent component (Heat.jsx) through the hook.
    //     - This value is used to set the initial position of the circular thermostat and is updated when the user interacts with the thermostat.
    // updateTargetTemp = function that allows us to update the target temperature in the parent component (Heat.jsx) when the user selects a new temperature on the circular thermostat.
    //     - This function is called when the user finishes dragging the knob to set a new temperature.
    // hook = an object returned from the useHeatDevice custom hook, which contains the current state and functions to update the device.
    //     - We destructure targetTemp and updateTargetTemp from this hook to use in our component.
    //     - The hook manages the logic for updating the device's temperature and ensures that changes are reflected across all components that use this hook for the same device.
    const { targetTemp, updateTargetTemp } = hook;


    return (
        <section className="heat-thermostat">
            <h2 className="heat-thermostat__title">{device.name}</h2>

            <section className="heat-thermostat__temperatures">
                <CircularThermostat
                    // set targetTemp from CircularThermostat to the value from the hook, so the thermostat knob starts at the correct position based on the device's current target temperature.
                    targetTemp={targetTemp}
                    // set updateTargetTemp from CircularThermostat to the function from the hook, so when the user selects a new temperature on the thermostat, it updates the target temperature in the parent component and ultimately updates the device's temperature.
                    updateTargetTemp={updateTargetTemp}
                />

                <div className="heat-thermostat__temperature">
                    <div className="heat-thermostat__outside-temperature">
                        <IoIosCloudOutline className="icon" />
                        <div className='outside-temp'>
                            <p>{weather.temperature}{weather.unit}</p>
                            <span>Udetemperatur</span>
                        </div>
                    </div>
                    <div className="heat-thermostat__inside-temperature">
                        <PiThermometerHotLight className="icon" />
                        <div className='inside-temp'>
                            <p>{Math.round(device.current_temp)}°C</p>
                            <span>Indetemperatur</span>
                        </div>
                    </div>
                </div>

            </section>
        </section>
    );

}