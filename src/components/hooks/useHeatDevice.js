import { useState, useEffect, useRef } from "react";


export default function useHeatDevice(device) {

    // targetTemp = current target temp in the API
    // ventLevel = current vent level in the API
    // mode = current mode in the API
    // setTargetTemp, setVentLevel and setMode are used to update the target temp, vent level and mode in the UI when we optimistically update the UI, so it shows the new target temp, vent level and mode immediately when we click on a button to change it, instead of waiting for the response from the API to update the UI with the new values
    const [targetTemp, setTargetTemp] = useState(device.target_temp);
    const [ventLevel, setVentLevel] = useState(device.vent_level);
    const [mode, setMode] = useState(device.work_mode);

    // get the bearer token to access the api
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    // useRef is used here as a "lock" that keeps track of whether we are in the process of updating data to the API.
    // It changes without triggering a re-render, so we avoid useEffect overwriting our state in the middle of an update.
    const isUpdating = useRef(false);

    // useEffect makes sure that our local state stays in sync with the device data from the API
    // If device changes (e.g. after a fetch), we update the UI.
    useEffect(() => {
        // if device is null or undefined, or if we are currently updating, we skip this effect to avoid overwriting our local state with potentially stale data from the API
        if (!device || isUpdating.current) return;

        setTargetTemp(device.target_temp);
        setVentLevel(device.vent_level);
        setMode(device.work_mode);

    }, [device]);

    // Function that updates the device in the API.
    // Uses "optimistic update", so the UI updates immediately,
    // before we get a response from the server, for a faster user experience.
    const updateDevice = async (newTemp, newVent, newMode) => {

        // Mark that we are in the middle of an update, so useEffect doesn't overwrite our local state with stale data from the API while we are waiting for the response
        isUpdating.current = true;

        // save previous state, so we can rollback if something fails and the API doesn't update successfully with invalid data
        const prev = { targetTemp, ventLevel, mode };

        // setTargetTemp = to update the target temp in the UI to the new temp we want to change to, so it shows the new temp immediately when we click on a button to change it
        // instead of waiting for the response from the API to update the UI with the new temp
        setTargetTemp(newTemp);
        setVentLevel(newVent);
        setMode(newMode);

        try {
            const response = await fetch(
                `https://exercise.mobicom-pro.com/api/devices/${device.id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_TOKEN}`
                    },
                    body: JSON.stringify({
                        name: device.name,
                        target_temp: newTemp,
                        vent_level: newVent,
                        work_mode: newMode
                    })
                }
            );

            // If the API call fails → throw error
            if (!response.ok) throw new Error("Failed to update device");

        }
        catch (error) {
            // If an error occurs, we rollback to the previous state, so the UI matches the actual data in the API
            setTargetTemp(prev.targetTemp);
            setVentLevel(prev.ventLevel);
            setMode(prev.mode);
            console.error(error);
        }

        // set isUpdating to false, so useEffect can update the local state with new data from the API again, when we get a response from the API after an update, or when the device data changes for any other reason
        isUpdating.current = false;
    };


    // debounceRef is used to store a reference to the timeout for our debounced updateTargetTemp function
    // debouncing is a technique where we delay the execution of a function until a certain amount of time has passed since it was last called,
    // which we use to delay the API call until the user has stopped adjusting the temperature for 300ms.
    // This helps to prevent multiple rapid API calls for each degree in the slider, and only sends the final desired temperature after the user has stopped adjusting the temperature.
    const debounceRef = useRef(null);


    // update temperature with debounce.
    // This means we wait 300ms before sending the API call, to avoid many unnecessary requests during rapid changes.
    const updateTargetTemp = (newTemp) => {
        clearTimeout(debounceRef.current);

        // if device is off, turn on and set vent_level = 1, mode = manual
        if (mode === "off" && newTemp > 0) {
            updateDevice(newTemp, 1, "manual");
            return;
        }

        // if device slider is set to 0 → turn off device
        if (newTemp === 0) {
            updateDevice(0, 0, "off");
            return;
        }

        // for any other temp change, we optimistically update the UI immediately with the new temp, and then wait 300ms after the user stops changing the temp to send the API call to update the device with the new temp, vent level and mode.
        debounceRef.current = setTimeout(() => {
            updateDevice(newTemp, ventLevel, mode);
        }, 300);
    };

    // Vent level
    const updateVentLevel = (newVent) => {
        // if device is off and we try to set vent level > 0, we turn on the device with default temp = 20 and the new vent level
        if (mode === "off" && newVent > 0) {
            updateDevice(20, newVent, "manual");
        }
        // if device is on and we change the vent level, we update the device with the new vent level, keeping the current temp and mode
        else if (newVent !== ventLevel) {
            updateDevice(targetTemp, newVent, mode);
        }
    };

    // Mode update
    const updateMode = (newMode) => {
        // if device is off and we try to set mode to something else than "off", we turn on the device with default temp = 20, default vent level = 1 and the new mode
        if (mode === "off") {
            updateDevice(20, 1, newMode);
        }
        // if device is on and we change the mode, we update the device with the new mode, keeping the current temp and vent level
        else if (newMode !== mode) {
            updateDevice(targetTemp, ventLevel, newMode);
        }
    };

    // on/off button
    const toggleDevice = () => {
        // if device is off, we turn it on with default temp = 20, default vent level = 1 and mode = manual, so it doesn't just turn on with the previous temp, vent level and mode, which might not make sense for the user if they just want to quickly turn on the device without adjusting the settings.
        if (mode === "off") {
            updateDevice(20, 1, "manual");
        }
        // if device is on, we turn it off by setting temp = 0, vent level = 0 and mode = off, since the API requires these values to be set in order to turn off the device.
        else {
            updateDevice(0, 0, "off");
        }
    };

    // return mode, ventLevel, updateMode and updateVentLevel to use in HeatMode.jsx
    return {
        targetTemp,
        ventLevel,
        mode,
        updateTargetTemp,
        updateVentLevel,
        updateMode,
        toggleDevice
    };

}