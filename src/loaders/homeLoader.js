export default async function homeLoader() {

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    let deviceId = localStorage.getItem("deviceId");

    if (!deviceId) {
        const response = await fetch("https://exercise.mobicom-pro.com/api/devices", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) throw new Error("Kunne ikke hente devices");

        const devices = await response.json();

        if (!devices.length) throw new Error("Ingen devices fundet");

        deviceId = devices[0].id;

        localStorage.setItem("deviceId", deviceId);
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const from = formatDate(yesterday);
    const to = formatDate(today);

    const url = `https://exercise.mobicom-pro.com/api/statistics?device_id=${deviceId}&from=${from}&to=${to}`;
    
    const res = await fetch(url, { 
        headers: { 
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}` }
        }
    );

    if (!res.ok) throw new Error("Kunne ikke hente statistik");

    const stats = await res.json();

    const yesterdayData = stats.find(d => d.date === from) ?? { kwh: 0 };
    const todayData     = stats.find(d => d.date === to) ?? { kwh: 0 };

    return { yesterday: yesterdayData, today: todayData, deviceId };
}