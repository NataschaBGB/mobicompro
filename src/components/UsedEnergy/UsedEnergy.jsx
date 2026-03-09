import { PiPulse } from 'react-icons/pi';
import './UsedEnergy.sass';
import { NavLink } from 'react-router';


export default function UsedEnergy() {

    // get todays date
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('da-DK', options);

    return (

        <section className="used-energy">

            <h2 className='used-energy__title'>Energi Forbrug</h2>

            <section className="used-energy__statistics">

                <div className="used-energy__today">
                    <NavLink to="/statistics">
                        <PiPulse className='icon' />
                    </NavLink>
                    {/* use localstorage to get todays date from statistics page and display here */}
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