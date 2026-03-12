import { useLoaderData } from "react-router";
import Header from "../components/Header/Header";
import HeatMode from "../components/HeatMode/HeatMode";
import HeatVent from "../components/HeatVent/HeatVent";


export default function Heat() {

    const devices = useLoaderData();
    console.log("devices", devices);

    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Varme" />
    
            <main className="heat">
                {devices && devices.length > 0 ? (
                    devices.map((device) => (
                    <div key={device.id}>

                        <section className="heat__thermostat">
                            <h2>{device.name}</h2>
                            <div>
                                slider for target temp
                                <p>{device.target_temp}</p>
                                <p>Termostat</p>
                            </div>
                            <div className="thermostat-temperature">
                                <div className="thermostat-outside-temp">
                                    sky icon
                                    get outside temp from https://exercise.mobicom-pro.com/api/weather
                                    weather.temperature
                                    weather.unit (grader)
                                    Udetemperatur
                                </div>
                                <div className="thermostat-inside-temp">
                                    thermometer icon
                                    get inside temp from api
                                    Indetemperatur
                                </div>
                            </div>
                        </section>

                        <HeatVent device={device} />

                        <HeatMode device={device} />

                        <button className="heat_on-off-button">
                            {/* on click - set state and save in useLocalStorage hook */}
                            on/off icon
                        </button>

                    </div>
                ))
                ) : (
                    <section className="heat__no-devices">
                    <h3>Ingen data blev fundet for dette device</h3>
                    </section>
                )}
                
                {/* Temperature can be changed on slider - fetch value from api 
                    | PUT updates the value */}
                {/* Temperatures inside and outside - fetch value from api */}
                {/* Ventilation rate can be changed on slider - fetch from api 
                    | PUT updates the value */}
                {/* Mode - fetch from api 
                    | PUT updates the value */}
                {/* On/Off button - fetch value from api
                    | PUT updates the value
                    on: icon $icon-color-active, background-color $button-color-active
                    off: icon $icon-color, background-color $button-color */}
                
                {/* when changing something on the heat page, update the info in API with PUT request */}
                {/* take values from inputs and insert into database via API */}
            </main>
    
        </section>
    )

}