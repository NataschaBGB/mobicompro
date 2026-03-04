import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

export default function Thermostat() {
    
    return (
        <section className="thermostat-page">

            <Header showBurgerMenu={false} showBackButton={false} showOptions={false} title="Thermostat" />

            <main className="thermostat">
                <h2>Thermostat Page</h2>
            </main>

            <Navigation />

        </section>
        
    )

}