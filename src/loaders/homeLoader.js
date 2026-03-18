export default async function homeLoader() {
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    let deviceId = localStorage.getItem("deviceId");

    // Hvis ikke findes → hent fra API
    if (!deviceId) {
        const res = await fetch("https://exercise.mobicom-pro.com/api/devices", {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        if (!res.ok) {
            return {
                yesterday: { kwh: 0 },
                today: { kwh: 0 },
                deviceId: null
            };
        }

        const devices = await res.json();

        if (!devices.length) {
            return {
                yesterday: { kwh: 0 },
                today: { kwh: 0 },
                deviceId: null
            };
        }

        deviceId = devices[0].id;
        localStorage.setItem("deviceId", deviceId);
    }

    // 🔽 resten som før
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const from = formatDate(yesterday);
    const to = formatDate(today);

    const url = `https://exercise.mobicom-pro.com/api/statistics?device_id=${deviceId}&from=${from}&to=${to}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    if (!res.ok) {
        return {
            yesterday: { kwh: 0 },
            today: { kwh: 0 },
            deviceId
        };
    }

    const stats = await res.json();

    const yesterdayData = stats.find(d => d.date === from) ?? { kwh: 0 };
    const todayData = stats.find(d => d.date === to) ?? { kwh: 0 };

    return { yesterday: yesterdayData, today: todayData, deviceId };
}