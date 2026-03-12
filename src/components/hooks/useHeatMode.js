import { useState, useEffect } from "react";


export default function useHeatMode(device) {
    
    // mode = current mode to show as active mode
    // setMode = function to change mode
    // useState(device.work_mode) = initial value of mode is the current work_mode of the device, so when we open the heat mode page, it shows the correct active mode based on the device's current work_mode
    const [mode, setMode] = useState(device.work_mode);

    // get the bearer token to access the api
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // Sync mode hvis device.work_mode ændrer sig
    // useEffect makes sure that every time device.work_mode changes, we update our local mode state to match it, so if the device's mode is changed from somewhere else in the app, it will still show the correct active mode when we open the heat mode page
    useEffect(() => {
        setMode(device.work_mode);
    }, [device.work_mode]);

    // changeMode function to change the mode of the device, takes in the new mode as an argument
    const changeMode = async (newMode) => {

        // if the newMode (the clicked button) matches the current mode, we don't need to do anything, so we return early and don't make the API call
        if (newMode === mode) return;

        // save the current mode before changing it, so if the API call fails, we can rollback to the previous mode
        const previousMode = mode;

        // set mode to newMode (the value of clicked button)
        setMode(newMode);

        try {
            // update API with new values
            const response = await fetch(
                `https://exercise.mobicom-pro.com/api/devices/${device.id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                    body: JSON.stringify({
                        name: device.name,
                        target_temp: device.target_temp,
                        vent_level: device.vent_level,
                        work_mode: newMode,
                    }),
                }
            );

            // if PUT fails, show error
            if (!response.ok) throw new Error("Failed to update mode");
        }
        catch (error) {
            // if PUT fails, set mode to previous current mode
            setMode(previousMode);
            // and log the error
            console.error(error);
        }
    };

    // return mode and changeMode to use in HeatMode.jsx
    return { mode, changeMode };

}