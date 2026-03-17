import './StatisticsUsage.sass';


export default function StatisticsUsage() {

    return (
        <section className="statistics-usage">
            
            <div className="statistics-usage__header">
                <h2 className='statistics-usage__title'>Forbrug</h2>
                <select name="timeframe" id="timeframe">
                    <option value="day">I dag</option>
                    <option value="week">Ugentligt</option>
                    <option value="month">Månedligt</option>
                </select>
            </div>

            <div className='statistics-usage__bar-chart'>
                {/* graf her */}
                {/* stiplet grå linje = gennemsnitligt forbrug */}
                {/* hel blå linje = nuværende forbrug hvor prik er på nuværende dag */}
                {/* søjlediagram hvor nuværende dag er gradient farvet */}
                {/* man tir ons tor fre lør søn */}
            </div>

        </section>
    )

}