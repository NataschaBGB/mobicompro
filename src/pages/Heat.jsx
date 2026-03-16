import { useLoaderData } from "react-router";
import Header from "../components/Header/Header";
import HeatThermostat from "../components/HeatThermostat/HeatThermostat";
import HeatVent from "../components/HeatVent/HeatVent";
import HeatMode from "../components/HeatMode/HeatMode";



export default function Heat() {

    const { devices, weather } = useLoaderData();
    console.log("devices", devices);
    console.log("weather", weather);

    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Varme" />
    
            <main className="heat">
                {/* loop through devices */}
                {devices && devices.length > 0 ? (
                    devices.map((device) => (
                        // key = unique id for each device, so React can keep track of them when they change
                        // show data for each device in the API - name, current temp, target temp, mode and weather with that id
                        <div key={device.id}>

                            <HeatThermostat device={device} weather={weather} />

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
                
            </main>
    
        </section>
    )

}