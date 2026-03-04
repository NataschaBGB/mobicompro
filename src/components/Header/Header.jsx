import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import './Header.sass'


// Home:
//      Show burgermenu

// Statistics:
//      Hide burgermenu
//      Show 3 horizontal dots on the right side of the header

// Heat:
//      Hide burgermenu
//      Show back button on the left side of the header
//      Show 3 horizontal dots on the right side of the header


export default function Header({ showBurgerMenu, showBackButton, showOptions, title }) {
    
    return (
        <header className="header">
            {/* set as variable so it can be conditionally rendered */}
            {/* if true, show on page, if false, hide */}
            <section className="header__burger-menu" style={{ display: showBurgerMenu ? 'block' : 'none' }}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </section>

            {/* set as variable so it can be conditionally rendered */}
            <section className='header__back' style={{ display: showBackButton ? 'block' : 'none' }}>
                <IoIosArrowBack />
            </section>

            {/* set title to variable that can be changed on each page */}
            <h1 className="header__title">{title}</h1>

            {/* set as variable that can be conditionally rendered */}
            <section className="header__options" style={{ display: showOptions ? 'block' : 'none' }}>
                <BsThreeDotsVertical />
            </section>
        </header>
    )

}