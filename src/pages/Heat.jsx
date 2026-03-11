import { useLoaderData } from "react-router";
import Header from "../components/Header/Header";


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

                        <section>
                            <h2>{device.name}</h2>
                            <div>
                                slider for target temp
                                <p>{device.target_temp}</p>
                                <p>Termostat</p>
                            </div>
                            <div>
                                <div>
                                    sky icon
                                    get outside temp from the weather now
                                    Udetemperatur
                                </div>
                                <div>
                                    thermometer icon
                                    get inside temp from api
                                    Indetemperatur
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Ventilator</h2>
                            <div>
                                vent icon
                                <div>
                                    vent strength slider from api (6 boxes - 0 er slukket)
                                    ved klik på en box opdateres værdien i api
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Mode</h2>
                            <div>
                                <button>
                                    Manuel icon
                                    "Manuel"
                                </button>
                                <button>
                                    Tidsplan icon
                                    "Tidsplan"
                                </button>
                                <button>
                                    Boost icon
                                    "Boost"
                                </button>
                            </div>
                        </section>

                        <button>
                            on/off icon
                            on/off state from api
                            ved klik opdateres værdien i api
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