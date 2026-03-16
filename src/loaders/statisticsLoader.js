export default async function statisticsLoader({ params }) {

    // get API token from environment variables, so we can use it in the headers to access the API, and keep it secret by not hardcoding it in the code
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // get device id from local storage, saved on the heat page
    const deviceId = params.deviceId;

    // if device id does not exist, throw an error, so we can catch it in the error element in the router and display an error message to the user, because we need the device id to fetch the correct statistics for the device
    if (!deviceId) {
        throw new Error("Device ID blev ikke fundet. Kan ikke hente statistik.");
    }
    
    // split("T")[0] = split the date string at the "T" character, which separates the date and time in the ISO string, and get the first part of the split string
    const formatDate = (date) => date.toISOString().split("T")[0];
    // Output: "2026-03-16T14:30:00.000Z"

    // get todays date
    const today = new Date();
    
    // get todays date
    const yesterday = new Date(today);
    // subtract 1 day from todays date to get yesterdays date
    yesterday.setDate(today.getDate() - 1);

    // copy of todays date, so we can set monday to the correct date without changing todays date
    const monday = new Date(today);
    // diff = number of days since monday
    // getDay() to get the current day of the week as a number
    // (0-6, where 0 = sunday, 1 = monday, 2 = tuesday etc.)
    // add 6 to todays day
    // (1(monday)+6 = 7, 2(tuesday)+6 = 8, 3(wednesday)+6 = 9 etc.)
    // devide % result by 7(days in a week) and get the remainder number to get the number of days since monday
    // 0(sunday) + 6 = 6
    // 6 % 7 = 6, so if today is sunday, diff = 6, meaning it has been 6 days since monday
    // 4(thursday) + 6 = 10, 10 % 7 = 3, so if today is thursday, diff = 3, meaning it has been 3 days since monday
    const diff = (today.getDay() + 6) % 7;

    // today.getDate() = get the current day of the month as a number
    // subtract diff from todays date to get the date of the most recent monday
    // so if today is thursday the 12th, we subtract 3 to get monday the 9th, and if today is sunday the 8th, we subtract 6 to get monday the 2nd
    monday.setDate(today.getDate() - diff);

    // fetch from monday's date
    let fetchFrom = new Date(monday);
    // if yesterday is before monday, it means it was a sunday
    if (yesterday < monday) {
        // set fetchFrom to sunday's (yesterday's) date, so we can also get statistics for sunday from the previous week
        fetchFrom.setDate(monday.getDate() - 1);
    }

    // set from to mondays date and format it to the format the API expects (YYYY-MM-DD)
    const from = formatDate(fetchFrom);
    // set to to todays date and format it to the format the API expects (YYYY-MM-DD)
    const to = formatDate(today);

    // fetch statistics data from the API, with the bearer token in the headers to access the API
    // with the correct dates, we can show statistics for the current week on the statistics page, and if we want to show statistics for a different week, we can just change the from and to dates to the correct dates for that week
    const url = `https://exercise.mobicom-pro.com/api/statistics?device_id=${deviceId}&from=${from}&to=${to}`;

    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`
        }
    });
    
    // if the response is not ok, throw an error, so we can catch it in the error element in the router and display an error message to the user
    if (!response.ok) {
        throw new Error('Failed to fetch statistics data');
    }

    // parse the responses as json, so we can use the data in our components, and return it as an object with statistics properties, so we can access it in the useLoaderData hook in our Statistics page
    const statistics = await response.json();

    // get yesterdays and todays date in the format the API returns
    const yesterdayStr = formatDate(yesterday);
    const todayStr = formatDate(today);

    // find the statistics data for yesterday by matching the date with the yesterdayStr
    // if it does not exist, set it to null, so we can check for it in the Statistics page and display a message if there is no data for yesterday
    const yesterdayData = statistics.find(item => item.date === yesterdayStr) ?? null;
    const todayData = statistics.find(item => item.date === todayStr) ?? null;

    return { statistics, yesterday: yesterdayData, today: todayData };
}