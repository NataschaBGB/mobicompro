import { NavLink } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import './Header.sass'


export default function Header({ showBurgerMenu, showBackButton, showOptions, title }) {

    // on click on burger menu - open navigation
    const toggleMenu = (event) => {
        // toggle class on burger menu to animate it
        event.currentTarget.classList.toggle('header__burger-menu--active');

        // get nav element and toggle class to show/hide it
        const nav = document.querySelector('.header__nav');
        nav.classList.toggle('header__nav--active');
    };


    return (
        <header className="header">
            {/* style: if showBurgerMenu is set to true - show icon in header */}
            {/* if showBurgerMenu is set to false - hide icon in header */}
            <section className="header__burger-menu" style={{ visibility: showBurgerMenu ? 'visible' : 'hidden' }} onClick={toggleMenu}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </section>

            <nav className="header__nav">
                <a href="#">Smart Home</a>
                <a href="#">Statistik</a>
                <a href="#">Varme</a>
            </nav>

            {/* style: if showBackButton is set to true - show icon in header */}
            {/* if showBackButton is set to false - hide icon in header */}
            <NavLink to="/mobicompro" className='header__back' style={{ visibility: showBackButton ? 'visible' : 'hidden' }}>
                <IoIosArrowBack />
            </NavLink>

            {/* set title to variable that can be changed on each page */}
            <h1 className="header__title">{title}</h1>

            {/* style: if showOptions is set to true - show icon in header */}
            {/* if showOptions is set to false - hide icon in header */}
            <section className="header__options" style={{ visibility: showOptions ? 'visible' : 'hidden' }}>
                <BsThreeDotsVertical />
            </section>
        </header>
    )

}