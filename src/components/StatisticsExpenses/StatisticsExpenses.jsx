import { LiaCoinsSolid } from "react-icons/lia";
import './StatisticsExpenses.sass';


export default function StatisticsExpenses({ statistics }) {
    
    // get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // array of weekdays in Danish, starting with Sunday, so we can get the weekday from the date we get from the api, which is in the format YYYY-MM-DD, and show it in the UI instead of the date
    const weekdays = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];

    // function that takes a date string in the format YYYY-MM-DD and returns the corresponding weekday in Danish, using the weekdays array and the getDay() method of the Date object, which returns a number from 0 to 6 representing the day of the week (0 for Sunday, 1 for Monday, etc.)
    const getWeekday = (dateString) => {
        const date = new Date(dateString);
        return weekdays[date.getDay()];
    };

    return (
        <section className="statistics-expenses">
            <h2 className='statistics-expenses__title'>Udgifter</h2>
            
            <div className='statistics-expenses__days'>
                {statistics.map((day, index) => {
                    // isToday = true if day.date from api is the same as today's date, which we get from the today variable, which is in the format YYYY-MM-DD, so we can compare it with the date from the api
                    const isToday = day.date === today;

                    return (
                        <div className='statistics-expenses__day' key={index}>
                            {/* if icon is on todays date, set class to icon-today */}
                            <LiaCoinsSolid className={`icon ${isToday ? "icon-today" : ""}`} />
                            
                            <div className='day-info'>
                                <p className="date">{getWeekday(day.date)}</p>
                                <p className="kwh-usage">{day.kwh_usage} kWh</p>
                            </div>
                            {/* print the total price with two decimal places and a comma instead of a period */}
                            <p className="total-price">{day.currency} {day.total_price.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    )
                })}
            </div>

        </section>
    )

}