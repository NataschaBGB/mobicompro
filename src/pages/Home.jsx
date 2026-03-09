import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";
import '../style/_layout.sass'
import UsedEnergy from "../components/UsedEnergy/UsedEnergy";
import Rooms from "../components/Rooms/Rooms";
import Preset from "../components/Preset/Preset";
import SmartSettings from "../components/SmartSettings/SmartSettings";


export default function Home() {
    
    return (
        <section className="home-page">

            <Header showBurgerMenu={true} showBackButton={false} showOptions={false} title="Smart Home" />

            <main className="home">

                <UsedEnergy />

                <Rooms />

                <Preset />

                <SmartSettings />

            </main>

            <Navigation />

        </section>
    )

}