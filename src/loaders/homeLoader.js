export default async function homeLoader() {

    // get API token from environment variables, so we can use it in the headers to access the API, and keep it secret by not hardcoding it in the code
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // try to get device id from localstorage
    let deviceId = localStorage.getItem("deviceId");

    // if there is no device id in localstorage, it means the user has not been to the heat page yet, where we save the device id to localstorage
    if (!deviceId) {
        // instead, get the device id from the API, by fetching the devices data from the API
        const response = await fetch("https://exercise.mobicom-pro.com/api/devices", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) throw new Error("Kunne ikke hente devices");

        const devices = await response.json();

        if (!devices.length) throw new Error("Ingen devices fundet");

        // set deviceId to the id of the first device in the devices array
        deviceId = devices[0].id;

        // save device id to localstorage, so we can access it next time without having to fetch the devices data again, and use it to fetch the correct statistics for that device on the statistics page
        localStorage.setItem("deviceId", deviceId);
    }

    // get todays date
    const today = new Date();
    // create a copy of todays date and save the copy in a variable called yesterday
    const yesterday = new Date(today);
    // subtract 1 day from yesterdays date to get the correct date for yesterday, so we can use it to fetch the correct statistics for yesterday from the API, and show it in the UI on the statistics page
    yesterday.setDate(today.getDate() - 1);

    // format the dates to the format the API expects (YYYY-MM-DD)
    // use the toISOString() method of the Date object to get the date in ISO format, which is in the format YYYY-MM-DDTHH:mm:ss.sssZ, and then split the string at the "T" character, which separates the date and time, and get the first part of the split string, which is the date
    const formatDate = (date) => date.toISOString().split("T")[0];
    // set from to yesterdays date and format it to the format the API expects (YYYY-MM-DD)
    const from = formatDate(yesterday);
    // set to to todays date and format it to the format the API expects (YYYY-MM-DD)
    const to = formatDate(today);

    // fetch from the API with the correct dates, so we can show statistics for yesterday and today on the home page, and if we want to show statistics for a different day, we can just change the from and to dates to the correct dates for that day, and we also include the device id in the query parameters, so we can fetch the correct statistics for the device, and show it in the UI on the home page
    const url = `https://exercise.mobicom-pro.com/api/statistics?device_id=${deviceId}&from=${from}&to=${to}`;
    
    const res = await fetch(url, { 
        headers: { 
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}` }
        }
    );

    // if the response is not ok, throw an error, so we can catch it in the error element in the router and display an error message to the user, because we need the statistics data to show the correct information on the home page
    if (!res.ok) throw new Error("Kunne ikke hente statistik");

    // parse the response as json, so we can use the data in our components
    const stats = await res.json();

    // fint yesterdays data from the stats array, by finding the object with the date, that matches the date in the 'from' variable
    // if there is no object with that date, it means there is no data for yesterday, so we return an object with kwh set to 0, so we can still show the component without crashing, and show 0 kWh usage instead
    const yesterdayData = stats.find(d => d.date === from) ?? { kwh: 0 };
    // do the same for todays data, by finding the object with the date, that matches the date in the 'to' variable
    const todayData     = stats.find(d => d.date === to) ?? { kwh: 0 };

    return { yesterday: yesterdayData, today: todayData, deviceId };

}