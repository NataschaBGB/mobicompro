import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";
import '../style/_layout.sass'


export default function Home() {
    
    return (
        <section className="home-page">

            <Header showBurgerMenu={true} showBackButton={false} showOptions={false} title="Smart Home" />

            <main className="home">
                <h2>Welcome to the Smart Home App</h2>
            </main>

            <Navigation />

        </section>
    )

}