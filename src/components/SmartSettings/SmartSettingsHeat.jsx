import { NavLink } from 'react-router';
import { PiThermometerHotLight } from "react-icons/pi";
import { GiThermometerScale } from "react-icons/gi";
import './SmartSettingsHeat.sass';


export default function SmartSettingsHeat ({ label, isActive, onClick, degrees, mode, link }) {
    
    return (

        <section className="smart-settings-heat">
        
            <label className="smart-settings-heat__label">
                {label}
                <button
                    className={`toggle-area ${isActive ? "toggle-area--on" : ""}`}
                    onClick={onClick}
                >
                    <span className="toggle-area__circle"></span>
                </button>
            </label>
            <section className="smart-settings-heat__temperature">
                <PiThermometerHotLight className="icon" />
                <div className="temperature-info">
                    <p className="degrees">{degrees}°C</p>
                    <p className="mode">{mode} - mode</p>
                </div>
            </section>

            <NavLink to={link} className="smart-settings-heat__link">
                <GiThermometerScale className="icon" />
                <p>Indstillinger</p>
            </NavLink>

        </section>

    );

}