import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function Error() {

    return (
        <section className="error-page">

            <Header />

            <main className="error">
                <h2>Error: Page Not Found</h2>
            </main>

            <Footer />

        </section>
    )

}