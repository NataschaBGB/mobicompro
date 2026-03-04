import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

export default function Error() {

    return (
        <section className="error-page">

            <Header showBurgerMenu={false} showBackButton={false} showOptions={false} title="Error" />

            <main className="error">
                <h2>Error: Page Not Found</h2>
            </main>

            <Navigation />

        </section>
    )

}