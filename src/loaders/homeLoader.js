export default async function homeLoader() {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) throw new Error("Device ID mangler");

    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const from = formatDate(yesterday);
    const to = formatDate(today);

    const url = `https://exercise.mobicom-pro.com/api/statistics?device_id=${deviceId}&from=${from}&to=${to}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    if (!res.ok) throw new Error("Kunne ikke hente statistik");

    const stats = await res.json();
    const yesterdayData = stats.find(d => d.date === from) ?? { kwh: 0 };
    const todayData     = stats.find(d => d.date === to) ?? { kwh: 0 };

    return { yesterday: yesterdayData, today: todayData, deviceId };
}