import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

export default function Heat() {
    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Heat" />
    
            <main className="heat">
                <h2>Heat Page</h2>
            </main>
    
            <Navigation />
    
        </section>
    )

}