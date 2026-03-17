import { useLoaderData } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";
import StatisticsUsage from "../components/StatisticsUsage/StatisticsUsage";
import StatisticsExpenses from "../components/StatisticsExpenses/StatisticsExpenses";


export default function Statistics() {

    const { statistics, yesterday, today } = useLoaderData();
    console.log("Hele ugen:", statistics);
    console.log("I går:", yesterday);
    console.log("I dag:", today);

    // save yesterday's kWh usage and today's kWh usage in local storage, so we can use it in the UsedEnergy component to show the difference in kWh usage between yesterday and today, and calculate the percentage difference
    if (yesterday && yesterday.kwh) {
        localStorage.setItem("yesterdayKwh", yesterday.kwh);
    }
    if (today && today.kwh) {
        localStorage.setItem("todayKwh", today.kwh);
    }


    return (
        <section className="statistics-page">
        
            <Header showBurgerMenu={false} showBackButton={false} showOptions={true} title="Statistik" />

            <main className="statistics">

                <StatisticsUsage />
                <StatisticsExpenses statistics={statistics} />

            </main>

            <Navigation />

        </section>
    )

}