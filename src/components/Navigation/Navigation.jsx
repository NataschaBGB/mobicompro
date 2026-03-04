import { NavLink } from 'react-router'
import { BsGrid } from "react-icons/bs"
import { PiPulse } from "react-icons/pi"
import { TiThermometer } from "react-icons/ti";
import { TbCaretUpDown } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import './Navigation.sass'


export default function Navigation() {
    
    return (
        <nav className="navigation">

            <NavLink to="/mobicompro" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }
                end >
                <BsGrid />
            </NavLink>

            <NavLink to="/statistics" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <PiPulse />
            </NavLink>

            <NavLink to="/heat" 
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <TiThermometer />
                <TbCaretUpDown />
            </NavLink>

            <NavLink to="/light"
                className={({ isActive }) =>
                    `navigation__navigation-icon ${isActive ? "navigation__navigation-icon--active" : ""}`
                }>
                <HiOutlineLightBulb />
            </NavLink>

        </nav>
    )

}