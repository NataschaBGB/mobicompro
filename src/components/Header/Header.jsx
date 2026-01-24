
import './Header.sass'

export default function Header() {
    
    return (
        <header className="header">
            <section className="header__burger-menu">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </section>

            <h1 className="header__title">Smart Home</h1>
        </header>
    )

}