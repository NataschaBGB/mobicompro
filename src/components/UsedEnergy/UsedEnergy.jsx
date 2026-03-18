import { NavLink, useLoaderData } from 'react-router';
import { PiPulse } from 'react-icons/pi';
import './UsedEnergy.sass';


export default function UsedEnergy() {

    // get yesterday's kWh usage and today's kWh usage from the loader data
    const { yesterday, today, deviceId } = useLoaderData();
    
    // if yesterday or today is null or undefined, set kWh usage to 0, so we can still show the component without crashing, and show 0 kWh usage instead
    const yesterdayKwh = yesterday?.kwh_usage ?? 0;
    const todayKwh = today?.kwh_usage ?? 0;

    // the difference between yesterday's kWh usage and today's kWh usage
    const kwhDifference = todayKwh - yesterdayKwh;
    // calculate the percentage difference based on yesterday's usage
    // use the absolute value, so the percentage is always positive
    // if yesterday's usage is 0, set the percentage to 0 to avoid division by 0
    const procentDifference = yesterdayKwh > 0 ? (Math.abs(kwhDifference) / yesterdayKwh) * 100 : 0;

    // if kwhDifference is greater than 0, it means we have used more energy today than yesterday, so the differenceText should be "mere", otherwise it should be "mindre"
    const differenceText = kwhDifference > 0 ? "mere" : "mindre";

    // format today's date to the format "D. MMM YYYY" in Danish, so we can show it in the UI, and use it as the title of the section, so the user knows which day they are looking at
    const formattedDate = new Date().toLocaleDateString("da-DK", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });


    return (

        <section className="used-energy">

            <h2 className='used-energy__title'>Energi Forbrug</h2>

            <section className="used-energy__statistics">

                <div className="used-energy__today">
                    <NavLink to={`/statistics/${deviceId}`}>
                        <PiPulse className='icon' />
                    </NavLink>
                    <p className="date">{formattedDate}</p>
                </div>
                
                <div className="used-energy__details">
                    <p className="kwh">
                        {todayKwh.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                        <span> kWh</span>
                    </p>
                    <p className="procent">
                        {procentDifference.toFixed(0)}% {differenceText} end i går
                    </p>
                </div>

            </section>
        </section>
    )

}