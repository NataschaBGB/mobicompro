import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";
import '../style/_layout.sass'
import SmartSettings from "../components/SmartSettings/SmartSettings";


export default function Home() {
    
    return (
        <section className="home-page">

            <Header showBurgerMenu={true} showBackButton={false} showOptions={false} title="Smart Home" />

            <main className="home">

                <SmartSettings />

            </main>

            <Navigation />

        </section>
    )

}