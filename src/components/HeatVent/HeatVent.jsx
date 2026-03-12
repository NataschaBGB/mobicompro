import useHeatDevice from "../hooks/useHeatDevice";
import { heatVentLevels } from "./HeatVentData";
import { LuAirVent } from "react-icons/lu";
import './HeatVent.sass';


export default function HeatVent({ device }) {

    // ventLevel = current vent level in the API
    // updateVentLevel = function to update vent level in API
    // all from the useHeatDevice hook, where we send in the device as an argument, so it can update the vent level of the correct device when we call updateVentLevel(id)
    const { ventLevel, updateVentLevel } = useHeatDevice(device);
    
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
                            // when clicking on a button, we want to change the vent level to the id of the button (1,2,3,4,5,6)
                            // active vent level and levels under the active level gets 'active' class and changes color
                            className={`heat-vent__button ${
                            ventLevel >= id ? "heat-vent__button--active" : ""
                            }`}
                            // on click - activate updateVentLevel, which comes from the useHeatDevice hook, and send in the id of the vent level we want to change to
                            onClick={() => updateVentLevel(id)}
                        >
                        </button>
                    ))}
                </div>
            </div>
        </section>

    );

}