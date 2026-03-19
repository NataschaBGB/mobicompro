import { LuChevronDown } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { LiaCouchSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { PiCookingPot } from "react-icons/pi";
import './Rooms.sass';


export default function Rooms() {

    return (
        <section className="rooms">

            <div className="rooms__header">
                <h2 className="rooms__title">Rum</h2>
                <p>Vis Alle <LuChevronDown className="icon" /></p>
            </div>

            <section className="rooms__list">
                <div className="room">
                    <LiaBedSolid className="icon" />
                    <p className="name">Soveværelse</p>
                </div>
                <div className="room">
                    <LiaCouchSolid className="icon" />
                    <p className="name">Stue</p>
                </div>
                <div className="room">
                    <LuBath className="icon" />
                    <p className="name">Badeværelse</p>
                </div>
                <div className="room">
                    <PiCookingPot className="icon" />
                    <p className="name">Køkken</p>
                </div>
            </section>

        </section>
    )

}