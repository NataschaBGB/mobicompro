import { PiPulse } from 'react-icons/pi';
import './UsedEnergy.sass';
import { NavLink } from 'react-router';


export default function UsedEnergy() {

    // get todays date
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('da-DK', options);

    const deviceId = localStorage.getItem("deviceId");

    return (

        <section className="used-energy">

            <h2 className='used-energy__title'>Energi Forbrug</h2>

            <section className="used-energy__statistics">

                <div className="used-energy__today">
                    <NavLink to={`/mobicompro/statistics/${deviceId}`}>
                        <PiPulse className='icon' />
                    </NavLink>
                    {/* get todays date from https://exercise.mobicom-pro.com/api/weather */}
                    {/* weather.timestamp */}
                    <p className="date">{formattedDate}</p>
                </div>
                
                <div className="used-energy__details">
                    {/* use localstorage to get todays kWh usage and yesterdays kWh usage */}
                    {/* diaplay todays kWh usage here */}
                    <p className="kwh">29,3 <span>kWh</span></p>
                    {/* How much was used yesterday? */}
                    {/* How much was used today? */}
                    {/* Calculate the difference in procent and display here */}
                    <p className="procent">23% mindre end i går</p>
                </div>

            </section>
        </section>
    )

}