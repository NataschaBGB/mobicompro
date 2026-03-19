import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import "./StatisticsUsage.sass";


export default function StatisticsUsage({ statistics }) {
  
    // array of weekdays in Danish, starting with Monday, so we can get the weekday from the date we get from the api, which is in the format YYYY-MM-DD, and show it in the UI instead of the date
    const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
  
    const getWeekdayIndex = (dateString) => {
        // split the date and get the year, month and day as seperate variables
        const [year, month, day] = dateString.split("-");
        // create a new date object with the year, month and day, and get the day of the week as a number from 0 to 6, where 0 is Sunday, 1 is Monday etc.
        const date = new Date(year, month - 1, day);
        // get the day of the new date object
        const dayOfWeek = date.getDay();
        // if the day of the week is 0 (Sunday), return 6, otherwise return the day of the week - 1, so we get the correct index for the weekdays array, where Monday is at index 0 and Sunday is at index 6
        // because sunday is 0 in the getDay() method, but we want it to be 6 in our weekdays array, so we can show it as the last day of the week in our chart, and if it's not sunday, we just subtract 1 to get the correct index for the weekdays array
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    };

    // map through statistics and get kWh usage for each day
    const kwhUsage = statistics.map((stat) => stat.kwh_usage);
    // devide the sum of the kWh usage for the week by the number of days in the week to get the average kWh usage for the week, so we can show it as a line in the chart to compare each day's usage with the average usage for the week
    const averageKwhUsage = kwhUsage.reduce((sum, usage) => sum + usage, 0) / kwhUsage.length;
    // console.log(averageKwhUsage);

    // if today is 0 (sunday), set todaysIndex to 6, to match sunday in the weekdays array
    // if today is not sunday, set todaysIndex to the result of getDay() - 1, to get the correct index for the weekdays array, where Monday is at index 0 and Sunday is at index 6
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    

    // map through the weekdays array
    const statisticsData = weekdays.map((day, index) => {
        // find the statistics for the current day in the statistics array, by comparing the weekday index of the date from the api with the current index of the map function, using the getWeekdayIndex function to get the weekday index from the date string from the api
        const stats = statistics.find((s) => getWeekdayIndex(s.date) === index);
        return {
            // set name to the current day
            name: day,
            // set uv (kWh usage) to the kWh usage from the statistics for the current day
            // if it doesn't find any statistics for the current day, it means there is no data for that day, so we set uv to null
            uv: stats ? stats.kwh_usage : null,
            // set pv to the average kWh usage for the week
            pv: averageKwhUsage,
            // if the current index (day) is the same as todays index (day), set isToday to true, so we can show the blue dot and the gradient for today in the chart, otherwise set it to false
            isToday: index === todayIndex,
        };
    });


    return (
        <section className="statistics-usage">

            <div className="statistics-usage__header">
                <h2 className="statistics-usage__title">Forbrug</h2>
                {/* STYLE SELECT AND DEFAULT TO WEEKLY SHOW */}
                <select name="timeframe" id="timeframe">
                    <option value="day">I dag</option>
                    <option value="week">Ugentligt</option>
                    <option value="month">Månedligt</option>
                </select>
            </div>

            <ComposedChart 
                className="statistics-usage__chart"
                // display the chart with the data from the statisticsData array
                data={statisticsData}
                width="100%"
            >
                {/* dont show grid */}
                <CartesianGrid 
                    stroke="none" 
                />
                
                {/* Label styling and Gradient bar */}
                <defs>
                    <filter 
                        id="shadow" 
                        x="-50%" 
                        y="-50%" 
                        width="200%" 
                        height="200%"
                    > 
                        <feDropShadow 
                            dx="0" 
                            dy="1" 
                            stdDeviation="2"
                            floodColor="#000"
                            floodOpacity="0.3"
                        /> 
                    </filter>
                    <linearGradient 
                        id="todayGradient" 
                        x1="0" 
                        y1="0" 
                        x2="0" 
                        y2="1"
                    >
                        <stop 
                            offset="0%" 
                            stopColor="#0F407B80" 
                            stopOpacity={0}
                        />
                        <stop 
                            offset="100%" 
                            stopColor="#0F407B80" 
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>

                <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                // if the index of the tick is the same as todays index, set the fill color to blue, otherwise set it to gray, so we can highlight today's day in the x-axis labels
                tick={({ x, y, index }) => (
                    <text 
                        x={x} 
                        y={y + 15} 
                        textAnchor="middle" 
                        fill={index === todayIndex ? "#0F407B" : "#878A96"}
                    >
                        {weekdays[index]}
                    </text>
                )}
                />
                {/* dont show Y-axis in width */}
                <YAxis 
                    width={0} 
                    stroke="none"
                    // set the domain of the y-axis to start at 0 and end at 1.5 times the maximum kWh usage for the week, so we have some space above the highest bar in the chart to show the label for today's kWh usage without it being cut off
                    domain={[0, Math.max(...kwhUsage) * 1.5]}
                />

                {/* Grey dotted average line */}
                <Line 
                    type="monotone" 
                    dataKey="pv" 
                    stroke="#CBCCD2" 
                    strokeWidth={3} 
                    strokeDasharray="14 4" 
                    dot={false}
                    activeDot={false}
                />

                {/* Blue line for kWh usage */}
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#0F407B"
                    strokeWidth={3}
                    // if the dot is for today's day, show a blue dot with a white border, and a label above the dot with the kWh usage for today, otherwise dont show any dots
                    dot={(props) => {
                        // why payload? because the data for the dot is in the payload property of the props object, and we need to check if the isToday property of the payload is true, to know if we should show the blue dot and the label for that dot, and we also need the uv value from the payload to show it in the label above the dot
                        if (props.payload.isToday) {
                            const { cx, cy, payload } = props;
                            return (
                                <g>
                                    {/* Blue dot with white border */}
                                    <circle 
                                        cx={cx} 
                                        cy={cy} 
                                        r={6} 
                                        fill="#fff" 
                                        stroke="#0F407B" 
                                        strokeWidth={3} 
                                    />
                                    {/* Label for today's kWh usage */}
                                    <rect 
                                        x={cx - 40} 
                                        y={cy - 45} 
                                        width={80} 
                                        height={30} 
                                        rx={4} 
                                        ry={4} 
                                        fill="#fff" 
                                        filter="url(#shadow)" 
                                    /> 
                                    {/* Text to show inside the label */}
                                    <text 
                                        x={cx} 
                                        y={cy - 25} 
                                        textAnchor="middle" 
                                    > 
                                        {payload.uv.toFixed(1)} kWh 
                                    </text>
                                </g>
                            );
                        }
                        // if it's not today's day, dont show any dots, so we return null
                        return null;
                    }}
                    activeDot={false}
                />

                {/* Gradient bar for active day */}
                <Bar
                    dataKey="uv"
                    shape={(props) => {
                        // x and y are the coordinates for the top left corner of the bar
                        // width and height are the dimensions of the bar
                        // payload is the data for the bar, which includes the isToday property that we set in the statisticsData array, so we can check if it's today's day and show the gradient for that day
                        const { x, y, width, height, payload } = props;
                        return (
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill={payload.isToday ? "url(#todayGradient)" : "transparent"}
                            />
                        );
                    }}
                    />
            </ComposedChart>

        </section>
    );

}