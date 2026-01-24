import { NavLink } from 'react-router'
import { BsGrid } from "react-icons/bs"
import { PiPulse } from "react-icons/pi"
import { TiThermometer } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import './Footer.sass'


export default function Footer() {
    
    return (
        <footer className="footer">

            <NavLink to="/" 
                className={({ isActive }) =>
                    `footer__navigation-icon ${isActive ? "footer__navigation-icon--active" : ""}`
                }
                end >
                <BsGrid />
            </NavLink>

            <NavLink to="/statistics" 
                className={({ isActive }) =>
                    `footer__navigation-icon ${isActive ? "footer__navigation-icon--active" : ""}`
                }>
                <PiPulse />
            </NavLink>

            <NavLink to="/heat" 
                className={({ isActive }) =>
                    `footer__navigation-icon ${isActive ? "footer__navigation-icon--active" : ""}`
                }>
                <TiThermometer />
            </NavLink>

            <NavLink to="/light"
                className={({ isActive }) =>
                    `footer__navigation-icon ${isActive ? "footer__navigation-icon--active" : ""}`
                }>
                <HiOutlineLightBulb />
            </NavLink>

        </footer>
    )

}