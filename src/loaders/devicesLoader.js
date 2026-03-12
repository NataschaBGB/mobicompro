export default async function devicesLoader() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // weather api
    // https://exercise.mobicom-pro.com/api/weather

    const response = await fetch('https://exercise.mobicom-pro.com/api/devices', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch devices');
    }

    const devices = await response.json();
    
    return devices;
}