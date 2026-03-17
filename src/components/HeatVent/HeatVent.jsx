import useHeatDevice from "../hooks/useHeatDevice";
import { heatVentLevels } from "./HeatVentData";
import { LuAirVent } from "react-icons/lu";
import './HeatVent.sass';


export default function HeatVent({ hook }) {

    // ventLevel = the current ventilation level of the device, which is passed down from the parent component (Heat.jsx) through the hook.
    //     - This value is used to determine which ventilation level button is active and is updated when the user interacts with the ventilation controls.
    // updateVentLevel = function that allows us to update the ventilation level in the parent component (Heat.jsx) when the user selects a new level.
    // hook = an object returned from the useHeatDevice custom hook, which contains the current state and functions to update the device.
    //     - We destructure ventLevel and updateVentLevel from this hook to use in our component.
    //     - The hook manages the logic for updating the device's ventilation level and ensures that changes are reflected across all components that use this hook for the same device.
    const { ventLevel, updateVentLevel } = hook;
    
    return (
        <section className="heat-vent">
            
            <h2 className="heat-vent__title">Ventilator</h2>
            
            <div className="heat-vent__strength">
                <LuAirVent className="icon" />
                
                <div className="heat-vent__buttons">
                    {/* map through all vent levels from HeatVentData.js and display a button for each level */}
                    {heatVentLevels.map(({ id }) => (
                        <button
                            key={id}
                            className={`heat-vent__button ${
                                ventLevel >= id ? "heat-vent__button--active" : ""
                            }`}
                            onClick={() => updateVentLevel(id)}
                        ></button>
                    ))}

                </div>
            </div>
        </section>

    );

}