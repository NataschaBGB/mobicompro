import { useLoaderData } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";


export default function Heat() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    const decives = useLoaderData();

    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Varme" />
    
            <main className="heat">
                {devices && devices.length > 0 ? (
                    devices.map((device) => (
                    <div key={device.id}>
                        <h2>{device.name}</h2>
                        <p>Type: {device.type}</p>
                        <p>Status: {device.status}</p>
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
    
            <Navigation />
    
        </section>
    )

}