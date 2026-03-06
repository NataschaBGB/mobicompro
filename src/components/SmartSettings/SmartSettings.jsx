import { useLoaderData } from 'react-router';
import './SmartSettings.sass';


export default function SmartSettings() {
    
    const devices = useLoaderData();
    // console.log(devices);
    
    // fetched device:
    // current_temp: "22.30"
    // id: "36" - Save this in local storage and get in fetch on statistics page
    // name: "Stue"
    // target_temp: "23.00"
    // user_id: "36"
    // vent_level: "0"
    // work_mode: "manual"


    return (
        <section className="smart-settings">
            <h2>Smart Indstillinger</h2>
            
            {devices && devices.length > 0 ? (
                devices.map((device) => (
                    <div key={device.id} className="device">
                        <h3>{device.name}</h3>
                        <p>{device.target_temp}</p>
                        <p>{device.vent_level}</p>
                        <p>{device.work_mode}</p>
                    </div>
                ))
            ) : (
                <section className="shop__no-devices">
                <h3>No devices have been found</h3>
                </section>
            )}

            {/* light component with smart settings - */}
            {/* title (lys i køkken)    | title (lys i indkørsel) */}
            {/* label + on/off button */}
            {/* title (varme i køkken)  | title (lys i garage) */}
            {/* label + on/off button */}

            {/* Heat Component gets some data from API (more data is shown on heat page)*/}
            {/* heat component with smart settings - */}
            {/* title (varme i køkken)  | title (varme i soveværelse) */}
            {/* label + on/off button */}
            {/* thermometer icon |  temperature display
                                    current mode */}
            {/* Settings button with thermometer icon  - LINKS TO HEAT PAGE */}
            {/* import { LiaThermometerHalfSolid } from "react-icons/lia"; */}
            {/* <LiaThermometerHalfSolid /> */}
        </section>
    )

}