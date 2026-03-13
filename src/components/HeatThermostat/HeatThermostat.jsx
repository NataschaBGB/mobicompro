import { PiThermometerHotLight } from "react-icons/pi";
import { IoIosCloudOutline } from "react-icons/io";

import './HeatThermostat.sass';
import useHeatDevice from '../hooks/useHeatDevice';
import { useEffect, useRef, useState } from 'react';
import CircularThermostat from './CircularThermostat';
// import { CircularInput, CircularTrack, CircularProgress, CircularThumb } from "react-circular-input";


export default function HeatThermostat({ device }) {

    // targetTemp = current target temp in the API
    // updateTargetTemp = function to update target temp in API
    // all from the useHeatDevice hook, where we send in the device as an argument, so it can update the target temp of the correct device when we call updateTargetTemp
    const { targetTemp, updateTargetTemp } = useHeatDevice(device);

    return (
        <section className="heat-thermostat">
            <h2 className="heat-thermostat__title">{device.name}</h2>

            <section className="heat-thermostat__temperatures">
                <CircularThermostat 
                    initialTemp={targetTemp}
                    updateTargetTemp={updateTargetTemp}
                />

                <div className="heat-thermostat__temperature">
                    <div className="heat-thermostat__outside-temperature">
                        <IoIosCloudOutline className="icon" />
                        <div className='outside-temp'>
                            <p>11°C</p>
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