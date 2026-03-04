import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

export default function Statistics() {

    return (
        <section className="statistics-page">
        
            <Header showBurgerMenu={false} showBackButton={false} showOptions={true} title="Statistics" />

            <main className="statistics">
                <h2>Statistics Page</h2>
            </main>

            <Navigation />

        </section>
    )

}