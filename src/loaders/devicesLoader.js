export default async function devicesLoader() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // fetch devices data from the API, with the bearer token in the headers to access the API
    const responseDevices = await fetch('https://exercise.mobicom-pro.com/api/devices', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });

    // fetch weather data from the API, with the bearer token in the headers to access the API
    const responseWeather = await fetch('https://exercise.mobicom-pro.com/api/weather', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });
    
    // if either of the responses is not ok, throw an error, so we can catch it in the error element in the router and display an error message to the user
    if (!responseDevices.ok || !responseWeather.ok) {
        throw new Error('Failed to fetch devices or weather data');
    }

    // parse the responses as json, so we can use the data in our components, and return it as an object with devices and weather properties, so we can access it in the useLoaderData hook in our Heat page
    const devices = await responseDevices.json();
    const weather = await responseWeather.json();

    return { devices, weather };
}