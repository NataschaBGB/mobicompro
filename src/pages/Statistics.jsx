import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";


export default function Statistics() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    const [statisticsData, setStatisticsData] = useState([]);
    
    useEffect(() => {
        // get device_id from local storage
        fetch('https://exercise.mobicom-pro.com/api/statistics?device_id=36&from=2025-01-01&to=2026-01-14', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': `Bearer ${API_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setStatisticsData(data);
            console.log("data", data);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <section className="statistics-page">
        
            <Header showBurgerMenu={false} showBackButton={false} showOptions={true} title="Statistik" />

            <main className="statistics">
                <h2>Statistics Page</h2>
            </main>

            <Navigation />

        </section>
    )

}