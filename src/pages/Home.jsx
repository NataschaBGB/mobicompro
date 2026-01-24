import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import '../style/_layout.sass'


export default function Home() {
    
    return (
        <section className="home-page">

            <Header />

            <main className="home">
                <h2>Welcome to the Smart Home App</h2>
            </main>

            <Footer />

        </section>
    )

}