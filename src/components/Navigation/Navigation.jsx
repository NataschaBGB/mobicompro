import { NavLink } from 'react-router'
import { BsGrid } from "react-icons/bs"
import { PiPulse } from "react-icons/pi"
import { TiThermometer } from "react-icons/ti";
import { PiCaretUpDownDuotone } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi";
import './Navigation.sass'


export default function Navigation() {
    
    return (
        <nav className="navigation">

            <NavLink to="/mobicompro/" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }
                end >
                <BsGrid className='icon' />
            </NavLink>

            <NavLink to="/mobicompro/statistics" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <PiPulse className='icon' />
            </NavLink>

            <NavLink to="/mobicompro/thermostat" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <div className='double-icons'>
                    <TiThermometer className='icon'/>
                    <PiCaretUpDownDuotone className='icon' />
                </div>
                
            </NavLink>

            <NavLink to="/mobicompro/light"
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <HiOutlineLightBulb className='icon' />
            </NavLink>

        </nav>
    )

}