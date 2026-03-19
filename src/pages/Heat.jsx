import { useLoaderData } from "react-router";
import Header from "../components/Header/Header";
import useHeatDevice from "../hooks/useHeatDevice";
import HeatThermostat from "../components/HeatThermostat/HeatThermostat";
import HeatVent from "../components/HeatVent/HeatVent";
import HeatMode from "../components/HeatMode/HeatMode";
import HeatThermostatOnOff from "../components/HeatThermostatOnOff/HeatThermostatOnOff";


export default function Heat() {

    // useLoaderData is a hook from react-router that allows us to access the data loaded by the loader function for this route.
    // In this case, we expect the loader to return an object containing "devices" (the heating devices) and "weather" (the current weather information).
    // We destructure these values from the object returned by useLoaderData to use in our component.
    const { devices, weather } = useLoaderData();
    // console.log("devices", devices);
    // console.log("weather", weather);

    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Varme" />
    
            <main className="heat">
                {/* loop through devices */}
                {devices && devices.length > 0 ? (
                    devices.map((device) => {

                        // For each device, we create a hook using the useHeatDevice custom hook.
                        // This hook will manage the state and logic for this specific device, allowing us to control its temperature, mode, ventilation level, and on/off state from the child components.
                        const hook = useHeatDevice(device);

                        return (
                            <div key={device.id}>
                                <HeatThermostat
                                    device={device}
                                    weather={weather}
                                    hook={hook}
                                />
                                <HeatVent device={device} hook={hook} />
                                <HeatMode device={device} hook={hook} />
                                <HeatThermostatOnOff hook={hook} />
                            </div>
                        );
                    })
                ) : (
                    <section className="heat__no-devices">
                        <h3>Ingen data blev fundet for dette device</h3>
                    </section>
                )}

            </main>
        </section>
    )

}