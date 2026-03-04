import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

export default function Light() {
    
    return (
        <section className="light-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Light" />
    
            <main className="light">
                <h2>Light Page</h2>
            </main>
    
            <Navigation />
    
        </section>
    )

}