import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";


export default function Heat() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    const [heatData, setHeatData] = useState([]);

    useEffect(() => {
        fetch('https://exercise.mobicom-pro.com/api/devices', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': `Bearer ${API_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setHeatData(data);
            console.log("data", data);
        })
        .catch(err => console.error(err));
    }, []);
    
    return (
        <section className="heat-page">

            <Header showBurgerMenu={false} showBackButton={true} showOptions={true} title="Varme" />
    
            <main className="heat">
                <h2>Heat Page</h2>
                {/* Temperature can be changed on slider - fetch value from api 
                    | PUT updates the value */}
                {/* Temperatures inside and outside - fetch value from api */}
                {/* Ventilation rate can be changed on slider - fetch from api 
                    | PUT updates the value */}
                {/* Mode - fetch from api 
                    | PUT updates the value */}
                {/* On/Off button - fetch value from api
                    | PUT updates the value
                    on: icon $icon-color-active, background-color $button-color-active
                    off: icon $icon-color, background-color $button-color */}
                
                {/* when changing something on the heat page, update the info in API with PUT request */}
                {/* take values from inputs and insert into database via API */}
            </main>
    
            <Navigation />
    
        </section>
    )

}